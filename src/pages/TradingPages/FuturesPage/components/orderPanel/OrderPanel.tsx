import { useState } from "react";
import { LeverageButton, LeverageWrapper, OrderTypeLink, OrderTypeWrapper, Wrapper } from "./orderPanel.styles";

interface IOrderPanel{
  price: number;
  symbol?: string;
}

const OrderPanel: React.FC<IOrderPanel> = ({ price, symbol }) => {
  const [orderType, setOrderType] = useState(0);

  return(
    <Wrapper>
      <LeverageWrapper>
        <LeverageButton>20x</LeverageButton>
      </LeverageWrapper>    
      <OrderTypeWrapper>
        <OrderTypeLink onClick={() => setOrderType(0)} active={orderType == 0 ? true : false}>Market</OrderTypeLink>
        <OrderTypeLink onClick={() => setOrderType(1)} active={orderType == 1 ? true : false}>Limit</OrderTypeLink>
      </OrderTypeWrapper>
      
    </Wrapper>
  )
}

export default OrderPanel;