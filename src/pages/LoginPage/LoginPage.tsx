import { useContext, useEffect, useState } from 'react';
import EmailForm from '../../components/LoginComponents/forms/EmailForm';
import PasswordForm from '../../components/LoginComponents/forms/PasswordForm';
import LoginLayout from '../../layout/Login/LoginLayout';
import ResetPasswordButton from '../../components/LoginComponents/links/ResetPasswordButton';
import SignUpButton from '../../components/LoginComponents/links/SignUpButton';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ConfirmAccount from '../RegisterPage/components/ConfirmAccount/ConfirmAccount';

// This component renders the login page with multiple steps.
const LoginPage = () => {

  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(isLoggedIn)
    if(isLoggedIn == true){
      navigate("/")
    }
  }, [])
  
  // Initialize state variables for the login page
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")

  // Function to handle clicking the "login" button on email page
  const nextStep = () => {
    setStep(step+1);
  }

  return(
    <LoginLayout>
      {/* Function that renders a given step in the login process */}
        {(() => {
          switch (step) {
            case 1:
              return(
                <EmailForm 
                  onNext={nextStep} 
                  setEmail={setEmail} 
                  key="email-input"
                />
              )
            case 2:
              return(
                <PasswordForm 
                  email={email}
                  nextStep={nextStep}
                  setPassword={setPassword}
                  key="password-input"
                />
              )
            case 3:
              return(
                <ConfirmAccount email={email} password={password}/>
              )
            default:
              console.warn(`Unexpected step value: ${step}`);
              return null
          }
        })()}      
      <ResetPasswordButton />
      <SignUpButton />
    </LoginLayout>
  )
}

export default LoginPage;