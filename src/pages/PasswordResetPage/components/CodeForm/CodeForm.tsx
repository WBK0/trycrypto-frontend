import { useEffect, useState } from "react";
import { Text, Heading, Wrapper } from "./codeForm.styles";
import api from "../../../../services/api";
import Loading from "./components/Loading/Loading";
import ResendButton from "./components/ResendButton/ResendButton";
import CodeInput from "./components/CodeInput/CodeInput";

// CodeForm interface
interface ICodeForm{
  email: string,
  nextStep: () => void,
  setCode: (code: string) => void
}

// CodeForm component - renders the code form
const CodeForm : React.FC<ICodeForm> = ({ email, nextStep, setCode }) => {
  // State variables
  const [loading, setLoading] = useState(true);

  // Send confirmation code to the user's email on component mount
  useEffect(() => {
    sendCode();
  }, [])

  // Function that sends the confirmation code to the user's email
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

  return(
    <Wrapper>
      {loading ? <Loading /> : null}
      <Heading>CONFIRM YOUR IDENTITY</Heading>
      <Text>We have sent a 6-digit code to your email address. Please check your inbox and enter the code in the provided input fields. If you do not receive the email, please check your spam folder or request the code to be sent again after 30 seconds.</Text>
      <CodeInput 
        setLoading={setLoading}
        email={email}
        nextStep={nextStep}
        setCode={setCode}
        loading={loading}
      />
    <ResendButton 
      sendCode={sendCode}
    />
    </Wrapper>
  )
}

export default CodeForm;