import { Form, Field } from "formik";
import styles from './inputs.module.css';
import { Input, InvalidMessage, Label } from "./styles/inputs.styles";

const EmailInput: React.FC<any> = ({ errors, touched, isSubmitting }) => {
  return(
    <Form noValidate>
      <Label htmlFor="email" >
          Email address  
      </Label>
      <Input
        name="email"
        type="email"
        id="email"
        error={errors.email && touched.email ? true : false}
        //className={`form-control form-control-lg mx-auto ${styles.loginInput} ${errors.email && touched.email ? "is-invalid" : null}`} 
        aria-describedby="validationEmail"
      />

      {/* Error message */}
      {errors.email && touched.email
        ?
          <InvalidMessage>{errors.email}</InvalidMessage>
        :
          null
      }
      <button 
        type="submit" 
        className={`btn btn-lg ${styles.loginButton}`}
      >
        {isSubmitting 
          ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          : <span>LOGIN</span>
        }
      </button> 
    </Form>
  )
}

export default EmailInput;