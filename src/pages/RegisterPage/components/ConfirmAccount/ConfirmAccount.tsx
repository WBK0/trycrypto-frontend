import { useContext, useEffect, useRef, useState } from "react";
import { Button, FlexContainer, Heading, Input, Text, Wrapper } from "./confirmAccount.styles";
import api from "../../../../services/api";
import Loading from "./components/Loading";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../../../contexts/AuthContext";
import Inputs from "./components/Inputs";

// ConfirmAccount interface
interface IConfirmAccount{
  email: string,
  password: string
}

// ConfirmAccount component - the component that renders account confirmation form on the register page
const ConfirmAccount: React.FC<IConfirmAccount> = ({ email, password }) => {
  // State variables
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<number>(30);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  // Get the setLoggedIn function from the AuthContext
  const { setLoggedIn }= useContext(AuthContext);

  // Get the navigate function from the react-router-dom
  const navigate = useNavigate();

  // useEffect hook to start the countdown timer to resend the verification code
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

  // Function to handle the form submit
  const handleSubmit = async (codeArray: string[]) => {
    // Joining the code array into a string
    const code = codeArray.join('');
    if(code.length !== 6){
      return;
    }
    // Setting the loading to true
    setLoading(true);

    try {
      // Sending the request to the server to confirm the account 
      await api.post('/user/confirm/email', {
        'email': email,
        'password': password,
        'code': code
      })
      // Toasting a success message
      toast.success('Your account has been successfully confirmed', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });   
      // Setting the logged in state to true and navigating to the home page   
      setLoggedIn(true);
      navigate('/');
    } catch (error) {
      // Toasting an error message and logging the error
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
    // Setting the loading to false
    setLoading(false)
  }

  // Function to handle the send again verification code
  const handleSendAgain = async () => {
    try {
      // setting the countdown to 30 seconds and disabling the button
      setCountdown(30);
      setIsButtonActive(false);
      // Sending the request to the server to resend the verification code
      await api.post('/user/confirm/resend', {
        email: email,
        password: password
      })
      // Toasting a success message
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
      // Toasting an error message and logging the error
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
