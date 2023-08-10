import { useEffect, useState } from "react";
import { Button } from "../../codeForm.styles";
import { toast } from "react-toastify";

interface IResendButton{
  sendCode: () => void;
}

const ResendButton : React.FC<IResendButton> = ({ sendCode }) => {
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(30);

  // Function that handle countdown timer for the resend email button 
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else {
      setIsButtonActive(true);
    }
    return () => clearInterval(intervalId);
  }, [countdown]);

  // Function that handles resending the confirmation code
  const handleSendAgain = async () => {
    try {
      // Reset the countdown timer
      setCountdown(30);
      setIsButtonActive(false);
      // Send the confirmation code again
      await sendCode();
      // Show success toast
      toast.success('Verification code resent', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });  
    } catch (error) {
      // Show error toast if something went wrong while sending the confirmation code
      console.log(error);
      toast.error('Error on sending verification code', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }); 
    }
  }
  
  return(
    <Button 
      onClick={handleSendAgain} 
      disabled={!isButtonActive}
    >{isButtonActive ? 'Send again' : `${countdown}`}
    </Button>
  )
}

export default ResendButton;