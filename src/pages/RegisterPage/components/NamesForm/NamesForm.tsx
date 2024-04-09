import * as Yup from 'yup';
import { Formik, FormikHelpers } from "formik";
import { Wrapper } from "./namesForm.styles";
import NamesInput from './components/NamesInput';
import api from '../../../../services/api';

// NamesForm interface
interface INamesForm{
  email: string;
  password: string;
  nextStep: () => void;
}

// NamesForm validation schema
const namesSchema = Yup.object().shape({
  username: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(20, 'First name must not exceed 20 characters'),
  firstname: Yup.string()
    .required('First name is required')
    .matches(/^[A-Za-z\s]+$/, 'First name must contain only letters')
    .min(3, 'First name must be at least 2 characters')
    .max(20, 'First name must not exceed 20 characters'),
  lastname: Yup.string()
    .required('Last name is required')
    .matches(/^[A-Za-z\s]+$/, 'Last name must contain only letters')
    .min(3, 'Last name must be at least 2 characters')
    .max(20, 'Last name must not exceed 20 characters'),
});

// NamesForm component - renders the names form on the register page
const NamesForm : React.FC<INamesForm> = ({ email, password, nextStep }) => {
  // Handling the form submission
  const handleSubmit = async(formValues: {username: string, firstname: string, lastname: string}, {setFieldError, setSubmitting}: FormikHelpers<{username: string, firstname: string, lastname: string}>) => {
    try {
      // Sending the request to the server to register the user and moving to the next step
      await api.post('/user/register', {
        email: email,
        password: password,
        username: formValues.username,
        firstname: formValues.firstname,
        lastname: formValues.lastname
      })
      nextStep();
    } catch (error : any) {
      // Handling the error - checking if the username is already taken
      if(error.response.data.error_code == 121){
        setFieldError("username", "Username is arleady taken")
      }
      console.log(error);
    }
    // Enabling the submit button
    setSubmitting(false)
  }

  return(
    <Wrapper>
      <Formik
        initialValues={{
          username: '',
          firstname: '',
          lastname: ''
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={namesSchema}
        onSubmit={
          (formValues, FormikHelpers) => 
          handleSubmit(formValues, {...FormikHelpers})
        }
        >
          {NamesInput}
      </Formik>
    </Wrapper>
  )
}

export default NamesForm;