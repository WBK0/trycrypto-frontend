import { useEffect, useRef } from "react";
import { Form } from "formik";
import { ButtonText, Input, InputSpinner, InvalidMessage, Label, LoginButton } from "../passwordForm.styles";

const PasswordInput: React.FC<any> = ({ errors, touched, isSubmitting }) => {

  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    passwordRef.current?.focus();
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
        Repeat password
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
          : <ButtonText>Next</ButtonText>
        }
      </LoginButton>
    </Form>
  )
}

export default PasswordInput;