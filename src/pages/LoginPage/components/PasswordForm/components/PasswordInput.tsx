import { useEffect, useRef } from "react";
import { Form } from "formik";
import { ButtonText, Input, InputSpinner, InvalidMessage, Label, LoginButton } from "../../forms.styles";

const PasswordInput: React.FC<any> = ({ errors, touched, isSubmitting }) => {

  const passwordRef = useRef<HTMLInputElement>(null);

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