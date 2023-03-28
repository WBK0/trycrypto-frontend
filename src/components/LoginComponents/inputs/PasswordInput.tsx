import styles from './inputs.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Defining the interface for the PasswordInput component
interface PasswordInputProps{
  email: string
}

// Validating the password field using the Yup library
const passwordSchema = Yup.object().shape({
  password: Yup.string()
  .min(8)
  .required('This field is required')
  .matches(/\d/, 'Number is required in password')
  .matches(/[a-z]/, 'Lower case is required in password')
  .matches(/[A-Z]/, 'Capital letter is required in password')
});

const PasswordInput: React.FC<PasswordInputProps> = ({email}) => {
  return(
    <div>
      {/* Greeting the user */}
      <h4 className={styles.welcome}>Hello again!</h4>
      <h5 className='mb-3'>{email}</h5>

      <Formik
        initialValues={{
          password: ''
        }}
        validationSchema={passwordSchema}
        onSubmit={values => {
          console.log(values);
        }}
        >
          {/* Form fields and error messages */}
          {({ errors, touched }) =>(
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
              />
              
              {/* Error message */}
              {errors.password && touched.password 
              ?
                <div 
                  id="validationPassword" 
                  className="invalid-feedback mt-2"
                >
                  {errors.password}
                </div>   
              :
                null
              }
              <button 
                type="submit" 
                className={`btn btn-lg ${styles.loginButton}`}
              >
                LOGIN
              </button>
            </Form>
          )}
      </Formik>
      
    </div>
  )
}

export default PasswordInput;