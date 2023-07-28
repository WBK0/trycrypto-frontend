import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import EmailInput from './components/EmailInput';
import { Wrapper } from './emailForm.styles';
import api from '../../../../services/api';

// Defining the interface for the EmailInput component
interface IEmailForm {
  onNext: () => void,
  setEmail: (value: string) => void,
  email: string
}

// Validating the email field using the Yup library
export const emailSchema = Yup.object().shape({
  email: Yup.string()
  .email('You have entered an incorrect email')
  .required('This field is required')
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'You have entered an incorrect email')
});

const EmailForm: React.FC<IEmailForm> = ({onNext, setEmail, email}) => {

  const handleSubmit = async(formValues: {email: string}, {setFieldError, setSubmitting}: FormikHelpers<{email: string}>) => {
    try {
      await api.post('/user/check/email/register', {
        "email": formValues.email
      })
      setEmail(formValues.email);
      onNext();
    } catch (error) {
      console.log(error);
      setFieldError("email", "That email address is taken");
    }
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
        {/* Form fields and error messages */}
        {EmailInput}
      </Formik>
    </Wrapper>
  )
}

export default EmailForm;