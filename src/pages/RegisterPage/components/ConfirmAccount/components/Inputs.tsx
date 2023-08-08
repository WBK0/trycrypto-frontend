import { useEffect, useRef, useState } from "react";
import { FlexContainer, Input } from "../confirmAccount.styles";

// Inputs interface
interface IInputs{
  handleSubmit: (code: string[]) => void,
  loading: boolean
}

// Inputs component - the component that renders the inputs for the confirmation code
const Inputs : React.FC<IInputs> = ({ handleSubmit, loading }) => {
  const codeLength = 6; // The length of the confirmation code
  // State variables
  const [confirmationCode, setConfirmationCode] = useState<string[]>(Array(codeLength).fill(''));
  // Refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array.from({ length: codeLength }, () => null));

  // useEffect hook to focus the first input when the loading state changes and on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [loading]);

  // Function to handle the paste event
  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text"); // Getting the pasted text
    const sanitizedText = pastedText.replace(/[^0-9]/g, ""); // Removing all non-numeric characters
    const truncatedText = sanitizedText.substring(0, codeLength); // Truncating the text to the code length

    // Setting the confirmation code state
    setConfirmationCode(truncatedText.split(""));
    if (truncatedText.length < codeLength) {
      inputRefs.current[truncatedText.length]?.focus();
    } else {
      await handleSubmit(truncatedText.split(""));
      setConfirmationCode(Array(codeLength).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

  // Function to handle the input change
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

  // Function to handle the backspace key
  const handleBackspace = (index: number) => {
    if (index > 0) {
      const newConfirmationCode = [...confirmationCode];
      newConfirmationCode[index - 1] = '';
      setConfirmationCode(newConfirmationCode);
      inputRefs.current[index - 1]?.focus();
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

export default Inputs;