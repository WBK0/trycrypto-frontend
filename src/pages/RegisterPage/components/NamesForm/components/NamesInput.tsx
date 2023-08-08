import { useEffect, useRef } from "react";
import { Form } from "formik";
import { ButtonText, Input, InputSpinner, InvalidMessage, Label, LoginButton } from "../namesForm.styles";

// NamesInput component - renders the names input fields
const NamesInput: React.FC<any> = ({ errors, touched, isSubmitting }) => {

  // Ref for the input field
  const usernameRef = useRef<HTMLInputElement>(null);

  // Focusing on the input field on mount
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);
  
  return(
    <Form>
      <Label 
        htmlFor="username" 
      >
        Username
      </Label>
      <Input 
        name="username" 
        type="text" 
        id="username"
        error={errors.username && touched.username ? true : false}
        aria-describedby="validationUsername"
        innerRef={usernameRef}
      />

      {/* Error message */}
      {errors.username && touched.username 
      ? <InvalidMessage 
          id="validationUsername" 
        >
          {errors.username}
        </InvalidMessage>   
      : null
      }
      <Label 
        htmlFor="firstname" 
      >
        First name
      </Label>
      <Input 
        name="firstname" 
        type="text" 
        id="firstname"
        error={errors.firstname && touched.firstname ? true : false}
        aria-describedby="validationFirstname"
      />

      {/* Error message */}
      {errors.firstname && touched.firstname 
      ? <InvalidMessage 
          id="validationFirstname" 
        >
          {errors.firstname}
        </InvalidMessage>   
      : null
      }
      <Label 
        htmlFor="lastname" 
      >
        Last name
      </Label>
      <Input 
        name="lastname" 
        type="lastname" 
        id="lastname"
        error={errors.lastname && touched.lastname ? true : false}
        aria-describedby="validationLastname"
      />

      {/* Error message */}
      {errors.lastname && touched.lastname 
      ? <InvalidMessage 
          id="validationLastname" 
        >
          {errors.lastname}
        </InvalidMessage>   
      : null
      }
      <LoginButton 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? <InputSpinner />
          : <ButtonText>Register</ButtonText>
        }
      </LoginButton>
    </Form>
  )
}

export default NamesInput;