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

// Register Page component - the main component of the register page
const RegisterPage = () => {
  // Getting the isLoggedIn state variable from the AuthContext
  const { isLoggedIn } = useContext(AuthContext)
  // Getting the navigate function from the react-router-dom
  const navigate = useNavigate()
  
  // State variables
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")

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

  // Function to go to the previous step
  const previousStep = () => {
    setStep(step - 1);
  }

  return(
    <LoginLayout>
      <>
        {(() => {
          // Rendering the correct component based on the step value
          switch (step) {
            case 1:
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
            case 4:
              return(
                <ConfirmAccount 
                  email={email}
                  password={password}
                  key="confirm-account"
                />
              )
              // If the step value is not 1, 2, 3 or 4, return null
            default:
              console.warn(`Unexpected step value: ${step}`);
              return null
          }
        })()}      
      </>
      {
        // Render the login text if the step value is 1, otherwise render the previous step component with exception of the step 4
        step == 1
        ? <LoginText>Do you have an account?</LoginText>
        : 
        step !== 4 && <PreviousStep previousStep={previousStep}/>
      }
      <LoginArrow />
    </LoginLayout>
  )
}

export default RegisterPage;