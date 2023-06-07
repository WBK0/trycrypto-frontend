import { Col } from "../../../../shared/col";
import { Row } from "../../../../shared/row";
import { BalanceWrapper, ContentBalance, HeaderBalance, Wrapper } from "./currentBalance.styles";

interface ICurrentBalance {
  balance?: number;
}

const CurrentBalance : React.FC<ICurrentBalance> = ({ balance }) => {
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
            <ContentBalance>{balance && balance.toFixed(2)} USDT</ContentBalance>
          </BalanceWrapper>
        </Col>
        
      </Row>
      

      
    </Wrapper>
  )
}

export default CurrentBalance;