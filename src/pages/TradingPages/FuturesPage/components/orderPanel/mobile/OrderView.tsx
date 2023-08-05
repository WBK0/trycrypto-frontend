import { LeverageButton, LeverageWrapper, OrderTypeLink, OrderTypeWrapper } from "../orderPanel.styles";
import IWallet from "../../../../../../interfaces/Wallet.interface";
import MarketOrder from "./market/MarketOrder";
import LimitOrder from "./limit/LimitOrder";

interface IOrderView{
  onClose: () => void;
  balance?: IWallet;
  symbol?: string;
  pairPrice: number;
  type: 'buy' | 'sell';
  fetchBalance: () => void;
  fetchPositions: () => void;
  leverage: number;
  handleChangeView: () => void;
  orderType: number;
  setOrderType: (type: number) => void;
  orderQuantity: string;
  setOrderQuantity: (quantity: string) => void;
  takeProfit: string;
  stopLoss: string;
  price: string;
  setTakeProfit: (takeProfit: string) => void;
  setStopLoss: (stopLoss: string) => void;
  setPrice: (price: string) => void;
}

const OrderView: React.FC<IOrderView> = ({ symbol, fetchBalance, fetchPositions, onClose, leverage, balance, handleChangeView, pairPrice, type, orderType, setOrderType, orderQuantity, setOrderQuantity, takeProfit, setTakeProfit, stopLoss, setStopLoss, price, setPrice }) => {
  return(
    <>
     <LeverageWrapper>
        <LeverageButton onClick={handleChangeView}>{leverage}X</LeverageButton>
      </LeverageWrapper>
      <OrderTypeWrapper>
        <OrderTypeLink onClick={() => setOrderType(0)} active={orderType == 0 ? true : false}>Market</OrderTypeLink>
        <OrderTypeLink onClick={() => setOrderType(1)} active={orderType == 1 ? true : false}>Limit</OrderTypeLink>
      </OrderTypeWrapper>
      {(() => {
          switch (orderType) {
            case 0:
              return(
                <MarketOrder 
                  price={pairPrice} 
                  symbol={symbol} 
                  balance={balance} 
                  fetchBalance={fetchBalance} 
                  fetchPositions={fetchPositions} 
                  leverage={leverage}
                  onClose={onClose}
                  type={type}
                  orderQuantity={orderQuantity}
                  setOrderQuantity={setOrderQuantity}
                  takeProfit={takeProfit}
                  setTakeProfit={setTakeProfit}
                  stopLoss={stopLoss}
                  setStopLoss={setStopLoss}
                />
              )
            case 1:
              return(
                <LimitOrder 
                  pairPrice={pairPrice} 
                  symbol={symbol} 
                  balance={balance} 
                  fetchBalance={fetchBalance} 
                  fetchPositions={fetchPositions} 
                  leverage={leverage}
                  onClose={onClose}
                  type={type}
                  orderQuantity={orderQuantity}
                  setOrderQuantity={setOrderQuantity}
                  takeProfit={takeProfit}
                  setTakeProfit={setTakeProfit}
                  stopLoss={stopLoss}
                  setStopLoss={setStopLoss}
                  price={price}
                  setPrice={setPrice}
                />
              )
            default:
              console.warn(`Unexpected step value: ${orderType}`);
              return null
          }
        })()}      
    </>
  )
}

export default OrderView;