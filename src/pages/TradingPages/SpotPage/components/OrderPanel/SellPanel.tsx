import { useEffect, useState } from "react";
import IWallet from "../../../../../interfaces/Wallet.interface";
import { Col } from "../../../../../shared/col";
import { Balance, Input, InputSymbol, InputText, InputWrapper, LoginButton, LoginLink, OrderButton, RangeInput } from "./orderPanel.styles";

interface ISellPanel {
  balance?: IWallet;
  isLoggedIn: boolean;
  symbol: string | undefined;
  pairPrice: number;
}

const SellPanel: React.FC<ISellPanel> = ({ balance, isLoggedIn, symbol, pairPrice }) => {
  const [orderQuantity, setOrderQuantity] = useState("0");

  const handleChange = (e : {target: {value: string}}) => {
    const quantity = e.target.value;
    const decimalIndex = quantity.indexOf('.');
    const numDecimalPlaces = decimalIndex === -1 ? 0 : quantity.length - decimalIndex - 1;

    if(balance && symbol && Number(e.target.value) <= Number(balance?.spotBalance[symbol.toUpperCase()]) && numDecimalPlaces <= 1){
      setOrderQuantity(e.target.value);
    }else if(balance && symbol && Number(e.target.value) && numDecimalPlaces <= 1){
      setOrderQuantity(balance?.spotBalance[symbol.toUpperCase()].toString())
    }
  }

  useEffect(() => {
    setOrderQuantity("0")
  }, [symbol])

  return(
    <Col xs={100} md={50} pr="0px" plMd="12px">
      <Balance>
        Dostępne: {symbol && balance?.spotBalance[symbol.toUpperCase()] ? balance?.spotBalance[symbol?.toUpperCase()].toFixed(4) : '0'} {symbol?.replace('usdt', '').toUpperCase()}
      </Balance>
      <InputWrapper>
        <InputText>Cena</InputText>
        <Input value="Market" disabled />
        <InputSymbol>USDT</InputSymbol>
      </InputWrapper>
      <InputWrapper>
        <InputText>Ilość</InputText>
        <Input value={orderQuantity} onChange={handleChange}/>
        <InputSymbol>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
      </InputWrapper>
      <RangeInput type="range" min="0" step={0.1} max={balance && symbol && balance?.spotBalance[symbol.toUpperCase()]} onChange={handleChange} value={orderQuantity}></RangeInput>
      <InputWrapper>
        <InputText>Suma</InputText>
        <Input value={(Number(orderQuantity) * pairPrice).toFixed(4)} readOnly/>
        <InputSymbol>USDT</InputSymbol>
      </InputWrapper>
      {isLoggedIn ?
        <OrderButton orderType="sell">Sell {symbol?.toUpperCase().replace('USDT', '')}</OrderButton>
      :
        <LoginButton>
          <LoginLink to='/login'>Login</LoginLink> or <LoginLink to='/register'>Register</LoginLink>
        </LoginButton>
      }
    </Col>
  )
}

export default SellPanel;