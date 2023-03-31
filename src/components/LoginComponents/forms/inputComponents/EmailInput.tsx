import { Form, Field } from "formik";
import styles from './inputs.module.css';

const EmailInput: React.FC<any> = ({ errors, touched, isSubmitting }) => {
  return(
    <Form noValidate>
      <label 
        htmlFor="email" 
        className={`form-label mt-1 ${styles.loginLabel}`}
        >
          Email address  
      </label>
      <Field 
        name="email" 
        type="email" 
        id="email" 
        className={`form-control form-control-lg mx-auto ${styles.loginInput} ${errors.email && touched.email ? "is-invalid" : null}`} 
        aria-describedby="validationEmail"
      />

      {/* Error message */}
      {errors.email && touched.email 
        ?
          <div id="validationEmail" className="invalid-feedback mt-2">{errors.email}</div>   
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