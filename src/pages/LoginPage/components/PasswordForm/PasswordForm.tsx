import { Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { passwordSchema } from './components/passwordSchema';
import PasswordInput from './components/PasswordInput';
import { useContext } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import { HelloHeader, Wrapper, EmailHeader } from '../forms.styles';
import api from '../../../../services/api';
import { toast } from 'react-toastify';

// Defining the interface for the PasswordInput component
interface IPasswordFormProps{
  email: string,
  nextStep: () => void,
  setPassword: (passoword: string) => void
}

const PasswordForm: React.FC<IPasswordFormProps> = ({ nextStep, email, setPassword}) => {

  const navigate = useNavigate()
  const { setLoggedIn, lastLocation } = useContext(AuthContext);

  const handleSubmit = async(formValues: {password: string}, {setFieldError, setSubmitting}: FormikHelpers<{password: string}>): Promise<void> => {
  
    try {
      // sending a query to the login server using the LoginService
      await api.post('/user/login', {
        email: email, 
        password: formValues.password
      });
      // display successful login notification
      toast.success('Successfully logged in', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
      // redirecting the user to the main page of the application
      navigate(lastLocation);
      setLoggedIn(true)
      setSubmitting(false);
    } catch (error : any) {
      console.log(error)
      if(error.response.data.error_code == 201){
        api.post('/user/confirm/resend', {
          email: email,
          password: formValues.password
        })
        nextStep();
        setPassword(formValues.password);
      }
      // display an error when the password is incorrect  
      setFieldError('password', 'The entered password is incorrect')
      setSubmitting(false);
    }
  }

  return(
    <Wrapper>
      {/* Greeting the user */}
      <HelloHeader>Hello again!</HelloHeader>
      <EmailHeader>{email}</EmailHeader>
      <Formik
        initialValues={{
          password: '',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={passwordSchema}
        onSubmit={(values, formikHelpers) => 
          handleSubmit(values, {...formikHelpers})
        }
        >
          {PasswordInput}
      </Formik>
    </Wrapper>
  )
}

export default PasswordForm;