import styles from './forms.module.css';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import handleSubmit from './services/handleLogin';
import { passwordSchema } from './schemas/passwordSchema';
import PasswordInput from './inputComponents/PasswordInput';
import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';

// Defining the interface for the PasswordInput component
interface IPasswordFormProps{
  email: string
}

const PasswordForm: React.FC<IPasswordFormProps> = ({email}) => {

  const navigate = useNavigate()
  const {setLoggedIn} = useContext(AuthContext);

  return(
    <div>
      {/* Greeting the user */}
      <h4 className={styles.welcomeHeader}>Hello again!</h4>
      <h5 className='mb-3'>{email}</h5>
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
    </div>
  )
}

export default PasswordForm;