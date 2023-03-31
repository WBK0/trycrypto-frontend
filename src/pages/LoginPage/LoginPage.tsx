import { useState } from 'react';
import EmailForm from '../../components/LoginComponents/forms/EmailForm';
import PasswordForm from '../../components/LoginComponents/forms/PasswordForm';
import LoginLayout from '../../components/LoginComponents/layout/LoginLayout';
import ResetPasswordButton from '../../components/LoginComponents/links/ResetPasswordButton';
import SignUpButton from '../../components/LoginComponents/links/SignUpButton';

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
    <LoginLayout>
      {/* Function that renders a given step in the login process */}
      <div className='mt-4'>
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
    </LoginLayout>
  )
}

export default LoginPage;