import { Formik } from 'formik';
import { emailSchema } from './schemas/emailSchema';
import handleSubmit from './services/handleCheckEmail';
import EmailInput from './inputComponents/EmailInput';

// Defining the interface for the EmailInput component
interface IEmailFormProps {
  onNext: () => void,
  setEmail: (value: string) => void
}

const EmailForm: React.FC<IEmailFormProps> = ({onNext, setEmail}) => {
  return(
    <div>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={emailSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={
          (formValues, FormikHelpers) => 
          handleSubmit(formValues, {...FormikHelpers, setEmail, onNext})
        }
      >
        {/* Form fields and error messages */}
        {EmailInput}
      </Formik>
    </div>
  )
}

export default EmailForm;