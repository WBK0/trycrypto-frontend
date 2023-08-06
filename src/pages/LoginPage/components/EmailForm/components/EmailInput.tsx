import { Form } from "formik";
import { ButtonText, Input, InputSpinner, InvalidMessage, Label, LoginButton } from "../../forms.styles";

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