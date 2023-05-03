import { useContext } from "react";
import { Row } from "../../../../../shared/row";
import { OrderWrapper } from "./orderPanel.styles";
import AuthContext from "../../../../../contexts/AuthContext";
import IWallet from "../../../../../interfaces/Wallet.interface";
import BuyPanel from "./BuyPanel";
import SellPanel from "./SellPanel";

interface IOrderPanel{
  symbol: string | undefined;
  balance?: IWallet;
  pairPrice: number;
  fetchBalance: () => void;
}

const OrderPanel: React.FC<IOrderPanel> = ({ symbol, balance, pairPrice, fetchBalance }) => {
  const { isLoggedIn } = useContext(AuthContext)
  
  return(
    <OrderWrapper>
    <Row>
      <BuyPanel balance={balance} isLoggedIn={isLoggedIn} symbol={symbol} pairPrice={pairPrice} fetchBalance={fetchBalance}/>
      <SellPanel balance={balance} isLoggedIn={isLoggedIn} symbol={symbol} pairPrice={pairPrice} fetchBalance={fetchBalance}/>
    </Row>
    </OrderWrapper>
  )
}

export default OrderPanel;