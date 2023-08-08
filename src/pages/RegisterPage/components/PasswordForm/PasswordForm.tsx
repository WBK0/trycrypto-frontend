import { Formik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from './components/PasswordInput';
import { Wrapper } from './passwordForm.styles';

// PasswordForm interface
interface IPasswordFormProps{
  setPassword: (password: string) => void,
  nextStep: () => void,
  password: string
}

// PasswordForm validation schema
const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/\d/, 'Number is required in password')
    .matches(/[a-z]/, 'Lower case is required in password')
    .matches(/[A-Z]/, 'Capital letter is required in password')
    .required('This field is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('This field is required')
});

// PasswordForm component - renders the password form on the register page
const PasswordForm: React.FC<IPasswordFormProps> = ({ setPassword, nextStep, password }) => {
  
  // Handling the form submission 
  const handleSubmit = async (formValues: {password: string}) => {
    // Setting the password and moving to the next step
    setPassword(formValues.password);
    nextStep();
  }

  return(
    <Wrapper>
      <Formik
        initialValues={{
          password: password,
          repeatPassword: password
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={passwordSchema}
        onSubmit={(values) => 
          handleSubmit(values)
        }
        >
          {PasswordInput}
      </Formik>
    </Wrapper>
  )
}

export default PasswordForm;  