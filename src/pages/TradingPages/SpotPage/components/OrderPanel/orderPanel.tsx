import { useContext, useState } from "react";
import { Row } from "../../../../../shared/row";
import { OrderWrapper, SwitchButton, SwitchOrderType } from "./orderPanel.styles";
import AuthContext from "../../../../../contexts/AuthContext";
import IWallet from "../../../../../interfaces/Wallet.interface";
import BuyPanelMarket from "./market/BuyPanel";
import SellPanelMarket from "./market/SellPanel";
import BuyPanelLimit from './limit/BuyPanel';
import SellPanelLimit from './limit/SellPanel';

interface IOrderPanel{
  symbol: string | undefined;
  balance?: IWallet;
  pairPrice: number;
  fetchBalance: () => void;
}

const OrderPanel: React.FC<IOrderPanel> = ({ symbol, balance, pairPrice, fetchBalance }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const [orderType, setOrderType] = useState(0);

  return(
    <OrderWrapper>
      <SwitchOrderType>
        <SwitchButton selected={orderType == 0 ? true : false} onClick={() => setOrderType(0)}>Market</SwitchButton>
        <SwitchButton selected={orderType == 1 ? true : false} onClick={() => setOrderType(1)}>Limit</SwitchButton>
      </SwitchOrderType>
      {
        orderType == 0
        ? 
        <Row>
          <BuyPanelMarket balance={balance} isLoggedIn={isLoggedIn} symbol={symbol} pairPrice={pairPrice} fetchBalance={fetchBalance}/>
          <SellPanelMarket balance={balance} isLoggedIn={isLoggedIn} symbol={symbol} pairPrice={pairPrice} fetchBalance={fetchBalance}/>
        </Row>
        :
        <Row>
          <BuyPanelLimit balance={balance} isLoggedIn={isLoggedIn} symbol={symbol} pairPrice={pairPrice} fetchBalance={fetchBalance}/>
          <SellPanelLimit balance={balance} isLoggedIn={isLoggedIn} symbol={symbol} pairPrice={pairPrice} fetchBalance={fetchBalance}/>
        </Row>
      }
      
    </OrderWrapper>
  )
}

export default OrderPanel;