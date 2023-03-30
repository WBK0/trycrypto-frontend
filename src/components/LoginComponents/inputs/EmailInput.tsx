import styles from './inputs.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import LoginService from './services/LoginService';

// Defining the interface for the EmailInput component
interface EmailInputProps {
  onNext: () => void,
  setEmail: (value: string) => void
}

// Validating the email field using the Yup library
const emailSchema = Yup.object().shape({
  email: Yup.string()
  .email('You have entered an incorrect email')
  .required('This field is required')
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'You have entered an incorrect email')
  .test('email-not-found', 'No account found with the given email address', async function(value) {
    try {
      const response = await LoginService.checkEmail(value);
      return response === true ? true : false;
    } catch (error) {
      return false;
    }
  })
});

const EmailInput: React.FC<EmailInputProps> = ({onNext, setEmail}) => {
  return(
    <div>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={emailSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values) => {
          setEmail(values.email);
          onNext();
        }}
      >

        {/* Form fields and error messages */}
        {({ errors, touched }) =>(
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
              LOGIN
            </button> 
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EmailInput;