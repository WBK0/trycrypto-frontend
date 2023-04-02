import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import LoginService from "./LoginService";
import { To } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../../contexts/AuthContext";

// Defining the interface for the handleSubmit login function
interface IHandleSubmit{
  password: string;
  email: string;
}

interface ExtendedFormikHelpers<T> extends FormikHelpers<T> {
  navigate: (to: To) => void;
  setLoggedIn: (value: boolean) => void;
}

// defining the form sending function
const handleSubmit = async(formValues: IHandleSubmit, {setFieldError, setSubmitting, navigate, setLoggedIn}: ExtendedFormikHelpers<IHandleSubmit>): Promise<void> => {
  
  try {
    // sending a query to the login server using the LoginService
    const loginResponse = await LoginService.loginUser(formValues.email, formValues.password);
    if(loginResponse === true){
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
      navigate('/');
      setLoggedIn(true)
      setSubmitting(false);
    }else{
      // display an error when the password is incorrect
      setFieldError('password', 'The entered password is incorrect')
      setSubmitting(false);
    }
  } catch (error) {
    // display an error when the password is incorrect  
    setFieldError('password', 'The entered password is incorrect')
    setSubmitting(false);
  }
}

export default handleSubmit;