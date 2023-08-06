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

interface ExtendedFormikHelpers<T> extends FormikHelpers<T>{
  setEmail: (email: string) => void;
  onNext: () => void;
}

const EmailForm: React.FC<IEmailFormProps> = ({onNext, setEmail}) => {
  const handleSubmit = async(formValues: {email : string}, {setFieldError, setSubmitting, setEmail, onNext}: ExtendedFormikHelpers<{email : string}>): Promise<void> => {
    try {
      await api.post('/user/check/email/login', {
        email: formValues.email
      });
      setEmail(formValues.email);
      onNext();
    } catch (error) {
      setFieldError('email', 'The entered email is incorrect')
    }
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