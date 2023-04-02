import { useEffect, useRef } from "react";
import { Field, Form } from "formik";
import styles from './inputs.module.css';

const PasswordInput: React.FC<any> = ({ errors, touched, isSubmitting }) => {

  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);
  
  return(
    <Form>
      <label 
        htmlFor="password" 
        className={`form-label mt-1 ${styles.loginLabel}`}
      >
        Password
      </label>
      <Field 
        name="password" 
        type="password" 
        id="password"
        className={`form-control form-control-lg mx-auto ${styles.loginInput} ${errors.password && touched.password ? "is-invalid" : ""} `}  
        aria-describedby="validationPassword"
        innerRef={passwordRef}
      />

      {/* Error message */}
      {errors.password && touched.password 
      ? <div 
          id="validationPassword" 
          className="invalid-feedback mt-2"
        >
          {errors.password}
        </div>   
      : null
      }
      <button 
        type="submit" 
        className={`btn btn-lg ${styles.loginButton}`}
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          : <span>LOGIN</span>
        }
      </button>
    </Form>
  )
}

export default PasswordInput;