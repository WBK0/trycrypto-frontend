import { useEffect, useRef, useState } from "react";
import { Button, FlexContainer, Heading, Input, Text, Wrapper } from "./confirmAccount.styles";

const ConfirmAccount = () => {
  const codeLength = 6;
  const inputRefs = useRef([]);
  const [countdown, setCountdown] = useState(30);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const [confirmationCode, setConfirmationCode] = useState(Array(codeLength).fill(''));

  useEffect(() => {
    let intervalId;
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
    console.log(inputRefs);
    inputRefs.current[0]?.focus()
  }, [])

  const handleInputChange = (index, value) => {

    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newConfirmationCode = [...confirmationCode];
    newConfirmationCode[index] = value;

    setConfirmationCode(newConfirmationCode);

    if (value !== '') {
      if (index < codeLength - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return(
    <Wrapper>
      <Heading>CONFIRM YOUR EMAIL</Heading>
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
          isLast={index == 5 ? true : false}
          onChange={(e) => handleInputChange(index, e.target.value)}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
      </FlexContainer>
      <Button disabled={!isButtonActive}>{isButtonActive ? 'Send again' : `${countdown}`}</Button>
    </Wrapper>
  )
}

export default ConfirmAccount;