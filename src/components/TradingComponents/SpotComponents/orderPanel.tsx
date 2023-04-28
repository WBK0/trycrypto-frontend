import { Col } from "../../../shared/col";
import { Row } from "../../../shared/row";
import { Balance, Input, InputSymbol, InputText, InputWrapper, OrderButton, OrderWrapper, RangeInput } from "./styles/orderPanel.styles";

interface IOrderPanel{
  symbol: string | undefined;
}

const OrderPanel: React.FC<IOrderPanel> = ({ symbol }) => {
  return(
    <OrderWrapper>
    <Row>
      <Col xs={100} md={50} pr="0px" prMd="12px">
        <Balance>
          Dostępne: 9434.32USDT
        </Balance>
        <InputWrapper>
          <InputText>Cena</InputText>
          <Input value="Market" disabled />
          <InputSymbol>USDT</InputSymbol>
        </InputWrapper>
        <InputWrapper>
          <InputText>Ilość</InputText>
          <Input />
          <InputSymbol>USDT</InputSymbol>
        </InputWrapper>
        <RangeInput type="range" min="0" max="100" defaultValue="50"></RangeInput>
        <InputWrapper>
          <InputText>Suma</InputText>
          <Input />
          <InputSymbol>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
        </InputWrapper>
        
        <OrderButton orderType="buy">Buy {symbol?.toUpperCase().replace('USDT', '')}</OrderButton>
      </Col>
      <Col xs={100} md={50} pr="0px" plMd="12px">
        <Balance>
          Dostępne: 9434.32USDT
        </Balance>
        <InputWrapper>
          <InputText>Cena</InputText>
          <Input value="Market" disabled />
          <InputSymbol>USDT</InputSymbol>
        </InputWrapper>
        <InputWrapper>
          <InputText>Ilość</InputText>
          <Input />
          <InputSymbol>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
        </InputWrapper>
        <RangeInput type="range" min="0" max="100" defaultValue="50"></RangeInput>
        <InputWrapper>
          <InputText>Suma</InputText>
          <Input />
          <InputSymbol>USDT</InputSymbol>
        </InputWrapper>
        <OrderButton orderType="sell">Sell {symbol?.toUpperCase().replace('USDT', '')}</OrderButton>
      </Col>
    </Row>
    </OrderWrapper>
  )
}

export default OrderPanel;