import { useContext, useState } from "react";
import LoginLayout from "../../layout/Login/LoginLayout";
import AuthContext from "../../contexts/AuthContext";
import EmailForm from "./components/EmailForm/EmailForm";
import CodeForm from "./components/CodeForm/CodeForm";
import PasswordsForm from "./components/PasswordsForm/PasswordsForm";

// PasswordResetPage component - renders the password reset page
const PasswordResetPage = () => {
  // Getting the isLoggedIn state from the AuthContext
  const { isLoggedIn } = useContext(AuthContext);
  // Initialising states
  const [step, setStep] = useState(isLoggedIn ? 2 : 1); // If the user is logged in, the step is 2, otherwise it is 1 
  const [email, setEmail] = useState("");
  const [code, setCode] = useState('');

  // Function to go to the next step
  const nextStep = () => {
    setStep(step + 1);
  }
  
  // Function to go to the previous step
  const previousStep = () => {
    setStep(step - 1);
  }

  return(
    <LoginLayout>
      <>
      {/* Switch statement to render the correct form based on the step value */}
        {(() => { 
          switch (step) {
            case 1:
              return(
                <EmailForm 
                  nextStep={nextStep}
                  email={email}
                  setEmail={setEmail}
                  key="email-input"
                />
              )
            case 2:
              return(
                <CodeForm 
                  email={email}
                  nextStep={nextStep}
                  setCode={setCode}
                  key="password-input"
                />
              )
            case 3:
              return(
                <PasswordsForm 
                  email = {email}
                  code = {code}
                  previousStep = {previousStep}
                  key="password-input"
                />
              )
            default: // If the step value is not 1, 2 or 3, return null and log a warning
              console.warn(`Unexpected step value: ${step}`);
              return null
          }
        })()}      
      </>
    </LoginLayout>
  )
}

export default PasswordResetPage;