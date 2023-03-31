import { FormikHelpers } from "formik";
import LoginService from "./LoginService";

interface IHandleSubmit {
  email: string; 
}

interface ExtendedFormikHelpers<T> extends FormikHelpers<T>{
  setEmail: (email: string) => void;
  onNext: () => void;
}

const handleSubmit = async(formValues: IHandleSubmit, {setFieldError, setSubmitting, setEmail, onNext}: ExtendedFormikHelpers<IHandleSubmit>): Promise<void> => {
  try {
    const response = await LoginService.checkEmail(formValues.email);
    if(response === true){
      setEmail(formValues.email);
      onNext();
    }else{
      setFieldError('email', 'The entered email is incorrect')
    }
  } catch (error) {
    setFieldError('email', 'The entered email is incorrect')
  }
  setSubmitting(false)
}

export default handleSubmit;