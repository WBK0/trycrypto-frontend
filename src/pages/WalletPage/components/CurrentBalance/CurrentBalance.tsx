import { Col } from "../../../../shared/col";
import { Row } from "../../../../shared/row";
import { BalanceWrapper, ContentBalance, HeaderBalance, Wrapper } from "./currentBalance.styles";

const CurrentBalance = () => {
  return(
    <Wrapper>
      <Row>
        <Col xs={50} pr="0px" pb="0px">
          <BalanceWrapper>
            <HeaderBalance>Current balance</HeaderBalance>
            <ContentBalance>328233.32 USDT</ContentBalance>
          </BalanceWrapper>
          
        </Col>
        <Col xs={50} pr="0px" pb="0px">
          <BalanceWrapper>
            <HeaderBalance>Predicted balance</HeaderBalance>
            <ContentBalance>328233.32 USDT</ContentBalance>
          </BalanceWrapper>
        </Col>
        
      </Row>
      

      
    </Wrapper>
  )
}

export default CurrentBalance;