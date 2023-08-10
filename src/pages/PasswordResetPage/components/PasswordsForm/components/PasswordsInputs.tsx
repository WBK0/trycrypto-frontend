import { useEffect, useRef } from "react";
import { Form } from "formik";
import { ButtonText, Input, InputSpinner, InvalidMessage, Label, LoginButton } from "../passwordsForm.styles";

// PasswordsInput component - renders the passwords input fields
const PasswordsInput: React.FC<any> = ({ errors, touched, isSubmitting }) => {

  // Create a ref for the password input field
  const passwordRef = useRef<HTMLInputElement>(null);

  // Focus on the password input field when the component mounts
  useEffect(() => {
    passwordRef.current?.focus();
  }, []);
  
  return(
    <Form>
      <Label 
        htmlFor="password" 
      >
        New password
      </Label>
      <Input 
        name="password" 
        type="password" 
        id="password"
        error={errors.password && touched.password ? true : false}
        aria-describedby="validationPassword"
        innerRef={passwordRef}
      />

      {/* Error message */}
      {errors.password && touched.password 
      ? <InvalidMessage 
          id="validationPassword" 
        >
          {errors.password}
        </InvalidMessage>   
      : null
      }
      <Label 
        htmlFor="repeatPassword" 
      >
        Repeat new password
      </Label>
      <Input 
        name="repeatPassword" 
        type="password" 
        id="repeatPassword"
        error={errors.repeatPassword && touched.repeatPassword ? true : false}
        aria-describedby="validationRepeatPassword"
      />

      {/* Error message */}
      {errors.repeatPassword && touched.repeatPassword 
      ? <InvalidMessage 
          id="validationRepeatPassword" 
        >
          {errors.repeatPassword}
        </InvalidMessage>   
      : null
      }
      <LoginButton 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? <InputSpinner />
          : <ButtonText>Change password</ButtonText>
        }
      </LoginButton>
    </Form>
  )
}

export default PasswordsInput;