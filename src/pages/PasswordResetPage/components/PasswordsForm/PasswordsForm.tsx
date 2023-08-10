import { Formik } from 'formik';
import * as Yup from 'yup';
import PasswordsInput from './components/PasswordsInputs';
import { Wrapper } from './passwordsForm.styles';
import api from '../../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../../../contexts/AuthContext';

// Defining the interface for the PasswordInput component
interface IPasswordFormProps{
  email: string,
  code: string,
  previousStep: () => void;
}

// Validating the password field using the Yup library
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


// PasswordsForm component - renders the password form
const PasswordsForm: React.FC<IPasswordFormProps> = ({ email, code, previousStep }) => {
  // Getting the navigate function from the react-router-dom library
  const navigate = useNavigate()

  // Getting the setLoggedIn function from the AuthContext
  const { setLoggedIn } = useContext(AuthContext)

  // Function to handle submitting the form
  const handleSubmit = async (formValues: {password: string}) => {
    try {
      // Sending a request to the server to change the password
      await api.post('/user/reset/password', {
        email: email,
        code: code,
        password: formValues.password
      })  
      // Displaying a success toast
      toast.success('Password change, please log in', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });  
      // Setting the logged in state to false and navigating to the login page
      setLoggedIn(false);
      navigate('/login');
    } catch (error : any) {
      console.log(error)
      // Displaying an error toast if the confirmation code is expired
      if(error.response.data.error_code == 362){
        toast.error('Confirmation code expired', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });  
        // Bringing the user back to the previous step
        previousStep();
      }else if(error.response.data.error_code == 111){
        // Displaying an error toast if the previous password is the same as the new password
        toast.error('The previous password cannot be the same as the new password', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });  
      }else{
        // Displaying an error toast if the request failed
        toast.error('Password change failed, please try again later', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
  }

  return(
    <Wrapper>
      <Formik
        initialValues={{
          password: '',
          repeatPassword: ''
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={passwordSchema}
        onSubmit={(values) => 
          handleSubmit(values)
        }
        >
          {PasswordsInput}
      </Formik>
    </Wrapper>
  )
}

export default PasswordsForm;  