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

const PasswordsForm: React.FC<IPasswordFormProps> = ({ email, code, previousStep }) => {

  const navigate = useNavigate()
  const { setLoggedIn } = useContext(AuthContext)

  const handleSubmit = async (formValues: {password: string}) => {
    try {
      await api.post('/user/reset/password', {
        email: email,
        code: code,
        password: formValues.password
      })  
      toast.success('Password change, please log in', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });  
      setLoggedIn(false);
      navigate('/login');
    } catch (error : any) {
      console.log(error)
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
        previousStep();
      }else{
        toast.error('The previous password cannot be the same as the new password', {
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