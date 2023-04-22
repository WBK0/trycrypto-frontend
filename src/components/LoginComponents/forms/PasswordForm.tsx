import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import handleSubmit from './services/handleLogin';
import { passwordSchema } from './schemas/passwordSchema';
import PasswordInput from './inputComponents/PasswordInput';
import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { HelloHeader, Wrapper, EmailHeader } from './styles/forms.styles';

// Defining the interface for the PasswordInput component
interface IPasswordFormProps{
  email: string
}

const PasswordForm: React.FC<IPasswordFormProps> = ({email}) => {

  const navigate = useNavigate()
  const {setLoggedIn} = useContext(AuthContext);

  return(
    <Wrapper>
      {/* Greeting the user */}
      <HelloHeader>Hello again!</HelloHeader>
      <EmailHeader>{email}</EmailHeader>
      <Formik
        initialValues={{
          password: '',
          email: email
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={passwordSchema}
        onSubmit={(values, formikHelpers) => 
          handleSubmit(values, {...formikHelpers, navigate, setLoggedIn})
        }
        >
          {PasswordInput}
      </Formik>
    </Wrapper>
  )
}

export default PasswordForm;