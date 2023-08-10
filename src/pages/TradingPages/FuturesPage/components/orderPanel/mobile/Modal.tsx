import { useState } from "react";
import { Close } from "../../../../../../shared/modal.styles";
import { ModalContent, ModalWrapper,  } from "./orderPanel.styles";
import IWallet from "../../../../../../interfaces/Wallet.interface";
import LeverageSelect from "./LeverageSelect";
import OrderView from "./OrderView";

// Modal interface
interface IModal{
  onClose: () => void;
  balance?: IWallet;
  symbol?: string;
  pairPrice: number;
  type: 'buy' | 'sell';
  fetchBalance: () => void;
  fetchPositions: () => void;
}

// Modal component - renders the modal
const Modal: React.FC<IModal> = ({ onClose, balance, symbol, pairPrice, type, fetchBalance, fetchPositions }) => {
  // Initialising the state
  const [leverage, setLeverage] = useState(10);
  const [view, setView] = useState(0);
  const [orderType, setOrderType] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [price, setPrice] = useState("");

  // Function to handle the change of view
  const handleChangeView = () => {
    setView(1)
  }

  // Function to handle the change of leverage
  const onChangeLeverage = (value : number) => {
    setLeverage(value);
    setView(0);
  }

  return(
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
        <Close onClick={onClose}>X</Close>
        {
          view == 0 ?
            <OrderView 
              symbol={symbol} 
              fetchBalance={fetchBalance} 
              fetchPositions={fetchPositions} 
              onClose={onClose} 
              leverage={leverage} 
              balance={balance} 
              handleChangeView={handleChangeView} 
              pairPrice={pairPrice} 
              type={type} 
              orderType={orderType}
              setOrderType={setOrderType}
              orderQuantity={orderQuantity}
              setOrderQuantity={setOrderQuantity}
              takeProfit={takeProfit}
              setTakeProfit={setTakeProfit}
              stopLoss={stopLoss}
              setStopLoss={setStopLoss}
              price={price}
              setPrice={setPrice}
            />
          :
            <LeverageSelect 
              mainLeverage={leverage} 
              onSave={onChangeLeverage}
            />
        }
      </ModalContent>
    </ModalWrapper>
  )
}

export default Modal;