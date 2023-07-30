import { useContext, useState } from "react";
import LoginLayout from "../../layout/Login/LoginLayout";
import AuthContext from "../../contexts/AuthContext";
import EmailForm from "./components/EmailForm/EmailForm";
import CodeForm from "./components/CodeForm/CodeForm";
import PasswordsForm from "./components/PasswordsForm/PasswordsForm";

const PasswordResetPage = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const [step, setStep] = useState(isLoggedIn ? 2 : 1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState('')

  const nextStep = () => {
    setStep(step + 1);
  }
  
  const previousStep = () => {
    setStep(step - 1);
  }

  return(
    <LoginLayout>
      <>
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
            default:
              console.warn(`Unexpected step value: ${step}`);
              return null
          }
        })()}      
      </>
    </LoginLayout>
  )
}

export default PasswordResetPage;