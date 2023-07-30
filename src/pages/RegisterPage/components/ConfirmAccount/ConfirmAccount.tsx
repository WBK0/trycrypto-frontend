import { useContext, useEffect, useRef, useState } from "react";
import { Button, FlexContainer, Heading, Input, Text, Wrapper } from "./confirmAccount.styles";
import api from "../../../../services/api";
import Loading from "./components/Loading";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../../../contexts/AuthContext";
import Inputs from "./components/Inputs";

interface IConfirmAccount{
  email: string,
  password: string
}

const ConfirmAccount: React.FC<IConfirmAccount> = ({ email, password }) => {
  const navigate = useNavigate();
  const { setLoggedIn }= useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<number>(30);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

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
    
  }

  return (
    <Wrapper>
      {loading ? <Loading /> : null}
      <Heading>CONFIRM YOUR EMAIL</Heading>
      <Text>We have sent a 6-digit code to your email address. Please check your inbox and enter the code in the provided input fields. If you do not receive the email, please check your spam folder or request the code to be sent again after 30 seconds.</Text>
      <Inputs handleSubmit={handleSubmit} loading={loading} />
      <Button onClick={handleSendAgain} disabled={!isButtonActive}>{isButtonActive ? 'Send again' : `${countdown}`}</Button>
    </Wrapper>
  );
};

export default ConfirmAccount;
