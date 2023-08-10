import { useEffect, useRef, useState } from "react";
import { FlexContainer, Input } from "../../codeForm.styles";
import api from "../../../../../../services/api";
import { toast } from "react-toastify";

// CodeInput interface
interface ICodeInput{
  setLoading: (loading: boolean) => void,
  email: string,
  nextStep: () => void,
  setCode: (code: string) => void,
  loading: boolean
}

// CodeInput component - renders the code input
const CodeInput : React.FC<ICodeInput> = ({ setLoading, email, nextStep, setCode, loading }) => {
  // State variables
  const codeLength = 6;
  const [confirmationCode, setConfirmationCode] = useState<string[]>(Array(codeLength).fill(''));
  
  // Refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array.from({ length: codeLength }, () => null));

  // Function to focus first input on component mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [loading]);

  // Function that handles submitting the confirmation code
  const handleSubmit = async (codeArray : string[]) => {
    setLoading(true);
    // If the code is not 6 digits long, return
    const code = codeArray.join('');
    if(code.length !== 6){
      return;
    }
    try {
      // Send the confirmation code to the server to check if it is valid
      await api.post('/user/reset/check/code', {
        email: email,
        code: code
      })
      // If the code is valid, set the code and go to the next step
      setLoading(false);
      setCode(code);
      nextStep();
    } catch (error) {
      // If the code is invalid, show error toast
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

  // Function that handles backspace key press
  const handleBackspace = (index: number) => {
    if (index > 0) {
      const newConfirmationCode = [...confirmationCode];
      newConfirmationCode[index - 1] = '';
      setConfirmationCode(newConfirmationCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Function that handles input change in the confirmation code inputs
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
      // If user ends entering the code in the last input, submit the code
      await handleSubmit(newConfirmationCode);
      // Reset the confirmation code
      setConfirmationCode(Array(codeLength).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

  // Function that handle pasting the confirmation code
  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text"); // Get pasted text
    const sanitizedText = pastedText.replace(/[^0-9]/g, ""); // Remove all non-numeric characters
    const truncatedText = sanitizedText.substring(0, codeLength); // Truncate to 6 characters

    setConfirmationCode(truncatedText.split(""));
    if (truncatedText.length < codeLength) {
      inputRefs.current[truncatedText.length]?.focus();
    } else {
      await handleSubmit(truncatedText.split(""));
      setConfirmationCode(Array(codeLength).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

  return(
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
  )
}

export default CodeInput;