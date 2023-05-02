import { Col } from "../../../../../shared/col";
import { Balance, Input, InputSymbol, InputText, InputWrapper, LoginButton, LoginLink, OrderButton, RangeInput } from "./orderPanel.styles";
import IWallet from './../../../../../interfaces/Wallet.interface';
import { useEffect, useState } from "react";

interface IBuyPanel {
  balance?: IWallet;
  isLoggedIn: boolean;
  symbol: string | undefined;
  pairPrice: number;
}

const BuyPanel: React.FC<IBuyPanel> = ({ balance, isLoggedIn, symbol, pairPrice }) => {
  const [orderQuantity, setOrderQuantity] = useState("0");

  const handleChange = (e : {target: {value: string}}) => {
    const quantity = e.target.value;
    const decimalIndex = quantity.indexOf('.');
    const numDecimalPlaces = decimalIndex === -1 ? 0 : quantity.length - decimalIndex - 1;
    console.log(numDecimalPlaces)
    if(balance && Number(e.target.value) <= Number((Math.floor(balance?.currentBalance / pairPrice * 10) / 10).toFixed(1)) && numDecimalPlaces <= 1){
      setOrderQuantity(e.target.value);
    }else if(balance && Number(e.target.value) && numDecimalPlaces <= 1){
      setOrderQuantity((Math.floor(balance?.currentBalance / pairPrice * 10) / 10).toFixed(1))
    }
  }

  useEffect(() => {
    setOrderQuantity("0")
  }, [symbol])

  return(
    <Col xs={100} md={50} pr="0px" prMd="12px">
      <Balance>
        Dostępne: {balance?.currentBalance.toFixed(2)} USDT
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
      <RangeInput type="range" min="0" step={0.1} max={balance && (Math.floor(balance?.currentBalance / pairPrice * 10) / 10).toFixed(1)} onChange={handleChange} value={orderQuantity}></RangeInput>
      <InputWrapper>
        <InputText>Suma</InputText>
        <Input value={(Number(orderQuantity) * pairPrice).toFixed(4)} readOnly/>
        <InputSymbol>USDT</InputSymbol>
      </InputWrapper>
      {isLoggedIn ?
        <OrderButton orderType="buy">Buy {symbol?.toUpperCase().replace('USDT', '')}</OrderButton>
      :
        <LoginButton>
          <LoginLink to='/login'>Login</LoginLink> or <LoginLink to='/register'>Register</LoginLink>
        </LoginButton>
      }
    </Col>
  )
}

export default BuyPanel;