import { useContext, useState } from "react";
import { Row } from "../../../../../shared/row";
import { OrderWrapper, SwitchButton, SwitchOrderType } from "./orderPanel.styles";
import AuthContext from "../../../../../contexts/AuthContext";
import IWallet from "../../../../../interfaces/Wallet.interface";
import BuyPanelMarket from "./components/market/BuyPanel";
import SellPanelMarket from "./components/market/SellPanel";
import BuyPanelLimit from './components/limit/BuyPanel';
import SellPanelLimit from './components/limit/SellPanel';

// OrderPanel interface
interface IOrderPanel{
  symbol: string | undefined;
  balance?: IWallet;
  pairPrice: number;
  fetchBalance: () => void;
}

// OrderPanel component - renders the order panel
const OrderPanel: React.FC<IOrderPanel> = ({ symbol, balance, pairPrice, fetchBalance }) => {
  // Initialising the state
  const [orderType, setOrderType] = useState(0);
  // Getting the isLoggedIn state from the AuthContext
  const { isLoggedIn } = useContext(AuthContext)

  return(
    <OrderWrapper>
      <SwitchOrderType>
        <SwitchButton 
          selected={orderType == 0} 
          onClick={() => setOrderType(0)}
          data-tooltip-id="tooltip" 
          data-tooltip-content="Market transaction is executed at the current market price"  
        >
          Market
        </SwitchButton>
        <SwitchButton 
          selected={orderType == 1} 
          onClick={() => setOrderType(1)}
          data-tooltip-id="tooltip" 
          data-tooltip-content="The transaction limit is executed at a price set by the client"
        >
          Limit
        </SwitchButton>
      </SwitchOrderType>
      { // If the order type is 0, render the market order panel, else render the limit order panel
        orderType == 0
        ? 
        <Row>
          <BuyPanelMarket balance={balance} isLoggedIn={isLoggedIn} symbol={symbol} pairPrice={pairPrice} fetchBalance={fetchBalance}/>
          <SellPanelMarket balance={balance} isLoggedIn={isLoggedIn} symbol={symbol} pairPrice={pairPrice} fetchBalance={fetchBalance}/>
        </Row>
        :
        <Row>
          <BuyPanelLimit balance={balance} isLoggedIn={isLoggedIn} symbol={symbol} pairPrice={pairPrice} fetchBalance={fetchBalance}/>
          <SellPanelLimit balance={balance} isLoggedIn={isLoggedIn} symbol={symbol} pairPrice={pairPrice} fetchBalance={fetchBalance} />
        </Row>
      }
      
    </OrderWrapper>
  )
}

export default OrderPanel;