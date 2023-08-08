import { Form } from "formik";
import { ButtonText, Input, InputSpinner, InvalidMessage, Label, LoginButton } from "../emailForm.styles";
import { useEffect, useRef } from "react";

// EmailInput component - renders the email input field
const EmailInput: React.FC<any> = ({ errors, touched, isSubmitting }) => {
  // Ref for the input field
  const inputRef = useRef<HTMLInputElement>(null)

  // Focusing on the input field on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return(
    <Form noValidate>
      <Label htmlFor="email" >
          Email address  
      </Label>
      <Input
        name="email"
        type="email"
        id="email"
        innerRef={inputRef}
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
          : <ButtonText>Next</ButtonText>
        }
      </LoginButton> 
    </Form>
  )
}

export default EmailInput;