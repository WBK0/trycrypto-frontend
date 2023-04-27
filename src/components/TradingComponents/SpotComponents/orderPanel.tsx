import { Col } from "../../../shared/col";
import { Row } from "../../../shared/row";
import styles from '../../../pages/TradingPages/SpotPage/spotPage.module.css'
import { Balance, Input, InputSymbol, InputText, InputWrapper, OrderButton, RangeInput } from "./styles/orderPanel.styles";

interface IOrderPanel{
  symbol: string;
}

const OrderPanel: React.FC<IOrderPanel> = ({ symbol }) => {
  return(
    <Row>
      <Col xs={50}>
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
        <RangeInput type="range" min="0" max="100"></RangeInput>
        <InputWrapper>
          <InputText>Suma</InputText>
          <Input />
          <InputSymbol>{symbol?.toUpperCase()}</InputSymbol>
        </InputWrapper>
        
        <OrderButton>Kup {symbol?.toUpperCase()}</OrderButton>
      </Col>
      <Col xs={50} pl="12px" pr='0px'>
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
        <InputWrapper>
          <InputText>Suma</InputText>
          <Input />
          <InputSymbol>{symbol?.toUpperCase()}</InputSymbol>
        </InputWrapper>
        <input type="range" className="form-range mb-3" min="0" max="100" id="customRange2"></input>
        <button type="button" className="btn btn-danger mb-4 w-100">Sprzedaj {symbol?.toUpperCase()}</button>
      </Col>
    </Row>
  )
}

export default OrderPanel;