import { useRef, useState } from "react";
import { Header, Question, Wrapper, Text, ShowAnswer, Answer } from "./faq.styles";

const Faq = () => {
  const [showAnswer, setShowAnswer] = useState(0);

  const handleShowAnswer = (questionId : number) => {
    if(showAnswer !== questionId){
      setShowAnswer(questionId)
    }else{
      setShowAnswer(0)
    }
  }

  return(
    <Wrapper>
      <Header>FAQ</Header>
      <Question onClick={() => handleShowAnswer(1)}>
        <Text>What is trycrypto.pl?</Text>
        <ShowAnswer>{showAnswer == 1 ? '-' : '+'}</ShowAnswer>
      </Question>
      <Answer showAnswer={showAnswer == 1} answerId={showAnswer} id="temp-answer1">
        Trycrypto.pl is a demo cryptocurrency exchange platform where users can trade various cryptocurrencies in a safe and simulated environment. It provides a hands-on experience of trading without the risk of losing real money.
      </Answer>
      <Question onClick={() => handleShowAnswer(2)}>
        <Text>How to create an account on trycrypto.pl?</Text>
        <ShowAnswer>{showAnswer == 2 ? '-' : '+'}</ShowAnswer>
      </Question>
      <Answer showAnswer={showAnswer == 2} answerId={showAnswer} id="temp-answer2">
        To create an account on trycrypto.pl, simply click on the "Sign Up" button on the homepage. You will be asked to provide your email address and create a password. Once you complete the registration process, you can start trading using the demo account.
      </Answer>
      <Question onClick={() => handleShowAnswer(3)}>
        <Text>What cryptocurrencies are available for trading?</Text>
        <ShowAnswer>{showAnswer == 3 ? '-' : '+'}</ShowAnswer>
      </Question>
      <Answer showAnswer={showAnswer == 3} answerId={showAnswer} id="temp-answer3">
        Trycrypto.pl offers a wide range of popular cryptocurrencies for trading, including Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Litecoin (LTC), and many others. The platform constantly updates its list of supported cryptocurrencies based on market demand.
      </Answer>
      <Question onClick={() => handleShowAnswer(4)}>
        <Text>Is trycrypto.pl a real exchange?</Text>
        <ShowAnswer>{showAnswer == 4 ? '-' : '+'}</ShowAnswer>
      </Question>
      <Answer showAnswer={showAnswer == 4} answerId={showAnswer} id="temp-answer4">
        No, trycrypto.pl is not a real exchange. It is a simulated trading platform designed for educational and demonstration purposes. All trades and transactions on trycrypto.pl are done with virtual funds and do not involve real money or real cryptocurrency assets.
      </Answer>
      <Question onClick={() => handleShowAnswer(5)}>
        <Text>Is there a fee for using trycrypto.pl?</Text>
        <ShowAnswer>{showAnswer == 5 ? '-' : '+'}</ShowAnswer>
      </Question>
      <Answer showAnswer={showAnswer == 5} answerId={showAnswer} id="temp-answer5">
        No, trycrypto.pl is completely free to use. There are no fees for creating an account, trading cryptocurrencies, or accessing any of the platform's features. It is designed to provide a risk-free environment for learning and practicing cryptocurrency trading.
      </Answer>
    </Wrapper>
  )
}

export default Faq;