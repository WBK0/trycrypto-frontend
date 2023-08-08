import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { Col } from "../../../../shared/col";
import { Row } from "../../../../shared/row";
import { BalanceWrapper, ContentBalance, HeaderBalance, Wrapper } from "./currentBalance.styles";

// Interface for the current balance component
interface ICurrentBalance {
  balance?: number;
}

// The current balance component - renders the current balance and the predicted balance
const CurrentBalance : React.FC<ICurrentBalance> = ({ balance }) => {
  // Creating a state for the predicted balance
  const [predictedBalance, setPredictedBalance] = useState(0)

  // Function to fetch the predicted balance
  const getPredictedBalance = async () => {
    try {
      const response = await api.get("/api/wallet/predicted/balance");
      setPredictedBalance(response.data.predictedBalance)
    } catch (error) {
      console.log(error);
    }
  }

  // Fetching the predicted balance on component mount
  useEffect(() => {
    getPredictedBalance()
  }, [])

  return(
    <Wrapper>
      <Row>
        <Col xs={50} pr="0px" pb="0px">
          <BalanceWrapper>
            <HeaderBalance>Current balance</HeaderBalance>
            <ContentBalance>{balance && balance.toFixed(2)} USDT</ContentBalance>
          </BalanceWrapper> 
        </Col>
        <Col xs={50} pr="0px" pb="0px">
          <BalanceWrapper>
            <HeaderBalance>Predicted balance</HeaderBalance>
            <ContentBalance>{balance && predictedBalance.toFixed(2)} USDT</ContentBalance>
          </BalanceWrapper>
        </Col>
      </Row>
    </Wrapper>
  )
}

export default CurrentBalance;