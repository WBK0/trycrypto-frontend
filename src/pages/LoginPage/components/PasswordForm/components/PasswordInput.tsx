import { useEffect, useRef } from "react";
import { Form } from "formik";
import { ButtonText, Input, InputSpinner, InvalidMessage, Label, LoginButton } from "../../forms.styles";

// Password input component - renders an input field for the user's password
const PasswordInput: React.FC<any> = ({ errors, touched, isSubmitting }) => {
  // Creating a ref for the password input
  const passwordRef = useRef<HTMLInputElement>(null);

  // Setting the focus on the password input when the component mounts
  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);
  
  return(
    <Form>
      <Label 
        htmlFor="password" 
      >
        Password
      </Label>
      <Input 
        name="password" 
        type="password" 
        id="password"
        error={errors.password && touched.password ? 'true' : 'false'}
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
      <LoginButton 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? <InputSpinner />
          : <ButtonText>LOGIN</ButtonText>
        }
      </LoginButton>
    </Form>
  )
}

export default PasswordInput;