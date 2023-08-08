import { Form } from "formik";
import { ButtonText, Input, InputSpinner, InvalidMessage, Label, LoginButton } from "../../forms.styles";
import { useEffect, useRef } from "react";

// Email input component - renders an input field for the user's email
const EmailInput: React.FC<any> = ({ errors, touched, isSubmitting }) => {
  // Creating a ref for the email input
  const emailRef = useRef<HTMLInputElement>(null);

  // Setting the focus on the email input when the component mounts
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
    console.log(emailRef)
  }, []);

  return(
    <Form noValidate>
      <Label htmlFor="email" >
          Email address  
      </Label>
      <Input
        name="email"
        type="email"
        id="email"
        innerRef={emailRef}
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