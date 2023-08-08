import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import EmailInput from './components/EmailInput';
import { Wrapper } from './emailForm.styles';
import api from '../../../../services/api';

// EmailForm interface
interface IEmailForm {
  onNext: () => void,
  setEmail: (value: string) => void,
  email: string
}

// EmailForm validation schema
export const emailSchema = Yup.object().shape({
  email: Yup.string()
  .email('You have entered an incorrect email')
  .required('This field is required')
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'You have entered an incorrect email')
});

// EmailForm component - renders the email form on the register page
const EmailForm: React.FC<IEmailForm> = ({onNext, setEmail, email}) => {

  // Handling the form submission
  const handleSubmit = async(formValues: {email: string}, {setFieldError, setSubmitting}: FormikHelpers<{email: string}>) => {
    try {
      // Checking if the email is already taken
      await api.post('/user/check/email/register', {
        "email": formValues.email
      })
      // Setting the email and moving to the next step
      setEmail(formValues.email);
      onNext();
    } catch (error) {
      // Handling the error
      console.log(error);
      setFieldError("email", "That email address is taken");
    }
    // Enabling the submit button
    setSubmitting(false)
  }

  return(
    <Wrapper>
      <Formik
        initialValues={{
          email: email
        }}
        validationSchema={emailSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={
          (formValues, FormikHelpers) => 
          handleSubmit(formValues, {...FormikHelpers})
        }
      >
        {EmailInput}
      </Formik>
    </Wrapper>
  )
}

export default EmailForm;