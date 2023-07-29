import { useContext, useEffect, useRef, useState } from "react";
import { Button, FlexContainer, Heading, Input, Text, Wrapper } from "./confirmAccount.styles";
import api from "../../../../services/api";
import Loading from "./components/Loading";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../../../contexts/AuthContext";

interface IConfirmAccount{
  email: string,
  password: string
}

const ConfirmAccount: React.FC<IConfirmAccount> = ({ email, password }) => {
  const navigate = useNavigate();
  const { setLoggedIn }= useContext(AuthContext)
  const codeLength = 6;
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array.from({ length: codeLength }, () => null));
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<number>(30);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string[]>(Array(codeLength).fill(''));

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text");
    const sanitizedText = pastedText.replace(/[^0-9]/g, "");
    const truncatedText = sanitizedText.substring(0, codeLength);

    setConfirmationCode(truncatedText.split(""));
    if (truncatedText.length < codeLength) {
      inputRefs.current[truncatedText.length]?.focus();
    } else {
      handleSubmit(truncatedText.split(""));
    }
  };

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

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [loading]);

  const handleSubmit = async (codeArray: string[]) => {
    const code = codeArray.join('');
    if(code.length !== 6){
      return;
    }
    setLoading(true);

    try {
      await api.post('/user/confirm/email', {
        'email': email,
        'password': password,
        'code': code
      })
      toast.success('Your account has been successfully confirmed', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });      
      setLoggedIn(true);
      navigate('/');
    } catch (error) {
      toast.error('Incorrect verification code provided', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }); 
      console.log(error)
      setConfirmationCode(Array(codeLength).fill(''))
    }
    setLoading(false)
  }

  const handleSendAgain = async () => {
    try {
      setCountdown(30);
      setIsButtonActive(false);
      await api.post('/user/confirm/resend', {
        email: email,
        password: password
      })
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
    setConfirmationCode(Array(codeLength).fill(''));
    inputRefs.current[0]?.focus();
  }

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newConfirmationCode = [...confirmationCode];
    newConfirmationCode[index] = value;
    setConfirmationCode(newConfirmationCode);

    if (value !== '' && index !== 5) {
      if (index < codeLength - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[index]?.blur();
      }
    }else{
      handleSubmit(newConfirmationCode);
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      const newConfirmationCode = [...confirmationCode];
      newConfirmationCode[index - 1] = '';
      setConfirmationCode(newConfirmationCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Wrapper>
      {loading ? <Loading /> : null}
      <Heading>CONFIRM YOUR EMAIL</Heading>
      <Text>We have sent a 6-digit code to your email address. Please check your inbox and enter the code in the provided input fields. If you do not receive the email, please check your spam folder or request the code to be sent again after 30 seconds.</Text>
      <FlexContainer>
        {confirmationCode.map((value, index) => (
          <Input
            key={index}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={value}
            disabled={loading}
            onPaste={handlePaste} 
            onChange={(e) => handleInputChange(index, e.target.value)}
            ref={(el) => (inputRefs.current[index] = el)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && value === "") {
                handleBackspace(index);
              } else if (e.key === "ArrowUp") {
                e.preventDefault()
              } else if (e.key === "ArrowDown") {
                e.preventDefault()
              }
            }}
          />
        ))}
      </FlexContainer>
      <Button onClick={handleSendAgain} disabled={!isButtonActive}>{isButtonActive ? 'Send again' : `${countdown}`}</Button>
    </Wrapper>
  );
};

export default ConfirmAccount;
