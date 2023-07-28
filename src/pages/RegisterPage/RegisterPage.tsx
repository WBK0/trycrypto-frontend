import { useContext, useEffect, useState } from 'react';
import EmailForm from './components/EmailForm/EmailForm';
import PasswordForm from './components/PasswordForm/PasswordForm';
import LoginLayout from '../../layout/Login/LoginLayout';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginArrow from './components/LoginArrow/loginArrow';
import LoginText from './components/LoginText/LoginText';
import PreviousStep from './components/PreviousStepText/PreviousStep';
import NamesForm from './components/NamesForm/NamesForm';
import ConfirmAccount from './components/ConfirmAccount/ConfirmAccount';

// This component renders the login page with multiple steps.
const RegisterPage = () => {

  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(isLoggedIn)
    if(isLoggedIn == true){
      navigate("/")
    }
  }, [])
  
  // Initialize state variables for the login page
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  // Function to handle clicking the "login" button on email page
  const nextStep = () => {
    setStep(step + 1);
  }

  const previousStep = () => {
    setStep(step - 1);
  }

  return(
    <LoginLayout>
      {/* Function that renders a given step in the login process */}
      <>
        {(() => {
          switch (step) {
            case 4:
              return(
                <EmailForm 
                  onNext={nextStep} 
                  setEmail={setEmail} 
                  email={email}
                  key="email-input"
                />
              )
            case 2:
              return(
                <PasswordForm 
                  setPassword={setPassword}
                  nextStep={nextStep}
                  password={password}
                  key="password-input"
                />
              )
            case 3:
              return(
                <NamesForm 
                  email={email}
                  password={password}
                  nextStep={nextStep}
                  key="names-input"
                />
              )
            case 0:
              return(
                <ConfirmAccount 
                  key="confirm-account"
                />
              )
            default:
              console.warn(`Unexpected step value: ${step}`);
              return null
          }
        })()}      
      </>
      {
        step == 1
        ? <LoginText>Do you have an account?</LoginText>
        : 
        step !== 0 && <PreviousStep previousStep={previousStep}/>
      }
      
      <LoginArrow />
    </LoginLayout>
  )
}

export default RegisterPage;