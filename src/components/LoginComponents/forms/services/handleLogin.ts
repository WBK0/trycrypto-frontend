import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import LoginService from "./LoginService";
import { To } from "react-router-dom";
import api from "../../../../services/api";

// Defining the interface for the handleSubmit login function
interface IHandleSubmit{
  password: string;
  email: string;
}

interface ExtendedFormikHelpers<T> extends FormikHelpers<T> {
  navigate: (to: To) => void;
  setLoggedIn: (value: boolean) => void;
  lastLocation: string;
  nextStep: () => void;
  setPassword: (passoword: string) => void
}

// defining the form sending function
const handleSubmit = async(formValues: IHandleSubmit, {setFieldError, setSubmitting, navigate, setLoggedIn, lastLocation, nextStep, setPassword}: ExtendedFormikHelpers<IHandleSubmit>): Promise<void> => {
  
  try {
    // sending a query to the login server using the LoginService
    await api.post('/user/login', {
      email: formValues.email, 
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
    if(error.response.data.error_code == 191){
      api.post('/user/confirm/resend', {
        email: formValues.email,
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

export default handleSubmit;