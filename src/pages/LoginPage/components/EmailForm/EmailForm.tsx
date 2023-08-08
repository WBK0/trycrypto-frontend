import { Formik, FormikHelpers } from 'formik';
import { emailSchema } from './components/emailSchema';
import EmailInput from './components/EmailInput';
import { Wrapper } from '../forms.styles';
import api from '../../../../services/api';

// Defining the interface for the EmailInput component
interface IEmailFormProps {
  onNext: () => void,
  setEmail: (value: string) => void
}

// Defining the interface for the FormikHelpers
interface ExtendedFormikHelpers<T> extends FormikHelpers<T>{
  setEmail: (email: string) => void;
  onNext: () => void;
}

// Email form component - renders a form that asks for the user's email
const EmailForm: React.FC<IEmailFormProps> = ({onNext, setEmail}) => {
  // Function that handles the form submission
  const handleSubmit = async(formValues: {email : string}, {setFieldError, setSubmitting, setEmail, onNext}: ExtendedFormikHelpers<{email : string}>): Promise<void> => {
    try {
      // Checking if the email exists in the database
      await api.post('/user/check/email/login', {
        email: formValues.email
      });
      // If the email exists, set the email state variable and go to the next step
      setEmail(formValues.email);
      onNext();
    } catch (error) {
      // If the email doesn't exist, set the email field error
      setFieldError('email', 'The entered email is incorrect')
    }
    // Set the submitting state variable to false
    setSubmitting(false)
  }

  return(
    <Wrapper>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={emailSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={
          (formValues, FormikHelpers) => 
          handleSubmit(formValues, {...FormikHelpers, setEmail, onNext})
        }
      >
        {/* Form fields and error messages */}
        {EmailInput}
      </Formik>
    </Wrapper>
  )
}

export default EmailForm;