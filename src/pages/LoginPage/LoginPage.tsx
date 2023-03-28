import { useState } from 'react';
import EmailInput from '../../components/LoginComponents/inputs/EmailInput';
import PasswordInput from '../../components/LoginComponents/inputs/PasswordInput';
import LoginContainer from '../../components/LoginComponents/containers/LoginContainer';
import ResetPasswordButton from '../../components/LoginComponents/hyperlinks/ResetPasswordButton';
import SignUpButton from '../../components/LoginComponents/hyperlinks/SignUpButton';

// This component renders the login page with multiple steps.
const LoginPage = () => {
  // Initialize state variables for the login page
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");

  // Function to handle clicking the "login" button on email page
  const nextStep = () => {
    setStep(2);
  }

  return(
    <LoginContainer>
      {/* Function that renders a given step in the login process */}
      <div className='mt-4'>
        {(() => {
          switch (step) {
            case 1:
              return(
                <EmailInput 
                  onNext={nextStep} 
                  setEmail={setEmail} 
                  key="email-input"
                />
              )
            case 2:
              return(
                <PasswordInput 
                  email={email}
                  key="password-input"
                />
              )
            default:
              console.warn(`Unexpected step value: ${step}`);
              return null
          }
        })()}      
      </div>
      <ResetPasswordButton />
      <SignUpButton />
    </LoginContainer>
  )
}

export default LoginPage;