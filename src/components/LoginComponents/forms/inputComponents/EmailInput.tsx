import { Form, Field } from "formik";
import { ButtonText, Input, InputSpinner, InvalidMessage, Label, LoginButton } from "./styles/inputs.styles";

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
      <LoginButton 
        type="submit" 
       
      >
        {isSubmitting 
          ? <InputSpinner />
          : <ButtonText>LOGIN</ButtonText>
        }
      </LoginButton> 
    </Form>
  )
}

export default EmailInput;