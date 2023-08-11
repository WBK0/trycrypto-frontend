import { useContext, useEffect, useState } from 'react';
import EmailForm from './components/EmailForm/EmailForm';
import PasswordForm from './components/PasswordForm/PasswordForm';
import LoginLayout from '../../layout/Login/LoginLayout';
import ResetPasswordButton from './components/ResetPassword/ResetPasswordButton';
import SignUpButton from './components/SignUp/SignUpButton';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ConfirmAccount from '../RegisterPage/components/ConfirmAccount/ConfirmAccount';

// Login Page component - the main component of the login page
const LoginPage = () => {
  // State variables
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")

  // Getting the isLoggedIn state variable from the AuthContext
  const { isLoggedIn } = useContext(AuthContext)
  // Getting the navigate function from the react-router-dom
  const navigate = useNavigate()

  // If the user is logged in, redirect to the home pages
  useEffect(() => {
    if(isLoggedIn == true){
      navigate("/")
    }
  }, [])
  
  // Function to go to the next step
  const nextStep = () => {
    setStep(step + 1);
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
                <ConfirmAccount 
                  email={email} 
                  password={password}
                />
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