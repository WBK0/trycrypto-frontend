import { useEffect, useRef, useState } from "react";
import { Text, Heading, Wrapper, Button, Input, FlexContainer } from "./codeForm.styles";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import Loading from "./components/Loading/Loading";

interface ICodeForm{
  email: string,
  nextStep: () => void,
  setCode: (code: string) => void
}

const CodeForm : React.FC<ICodeForm> = ({ email, nextStep, setCode }) => {
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState<number>(30);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const codeLength = 6;
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array.from({ length: codeLength }, () => null));
  const [confirmationCode, setConfirmationCode] = useState<string[]>(Array(codeLength).fill(''));

  useEffect(() => {
    sendCode();
  }, [])

  const sendCode = async () => {
    try {
      await api.post('/user/reset/password/code', {
        email: email,
      })
      setLoading(false);
    } catch (error) {
      console.log(error);
      return false
    }
  }

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [loading]);
  
  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text");
    const sanitizedText = pastedText.replace(/[^0-9]/g, "");
    const truncatedText = sanitizedText.substring(0, codeLength);

    setConfirmationCode(truncatedText.split(""));
    if (truncatedText.length < codeLength) {
      inputRefs.current[truncatedText.length]?.focus();
    } else {
      await handleSubmit(truncatedText.split(""));
      setConfirmationCode(Array(codeLength).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

  const handleInputChange = async (index: number, value: string) => {
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
      await handleSubmit(newConfirmationCode);
      setConfirmationCode(Array(codeLength).fill(''));
      inputRefs.current[0]?.focus();
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

  const handleSendAgain = async () => {
    try {
      setCountdown(30);
      setIsButtonActive(false);
      const isSend = await sendCode();
      if(!isSend){
        throw Error();
      }
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
  }

  const handleSubmit = async (codeArray : string[]) => {
    setLoading(true);
    const code = codeArray.join('');
    if(code.length !== 6){
      return;
    }
    try {
      await api.post('/user/reset/check/code', {
        email: email,
        code: code
      })
      setLoading(false);
      setCode(code);
      nextStep();
    } catch (error) {
      toast.error('Invalid code provided', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }); 
      console.log(error)
      setLoading(false)
    }
  }

  return(
    <Wrapper>
      {loading ? <Loading /> : null}
      <Heading>CONFIRM YOUR IDENTITY</Heading>
      <Text>We have sent a 6-digit code to your email address. Please check your inbox and enter the code in the provided input fields. If you do not receive the email, please check your spam folder or request the code to be sent again after 30 seconds.</Text>
      <FlexContainer>
      {confirmationCode.map((value, index) => (
        <Input
          key={index}
          type="text"
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
  )
}

export default CodeForm;