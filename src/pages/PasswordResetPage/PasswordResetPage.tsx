import { useContext, useState } from "react";
import LoginLayout from "../../layout/Login/LoginLayout";
import AuthContext from "../../contexts/AuthContext";
import EmailForm from "./components/EmailForm/EmailForm";
import CodeForm from "./components/CodeForm/CodeForm";

const PasswordResetPage = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const [step, setStep] = useState(isLoggedIn ? 2 : 1);


  return(
    <LoginLayout>
      <>
        {(() => {
          switch (step) {
            case 1:
              return(
                <EmailForm 
                  key="email-input"
                />
              )
            case 2:
              return(
                <CodeForm 
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