import { useState } from "react";
import { Close } from "../../../../../../shared/modal.styles";
import { Balance, Input, InputSymbol, InputText, InputWrapper, LeverageButton, LeverageWrapper, OrderTypeLink, OrderTypeWrapper, Price, PriceInfo, PriceText, PriceWrapper, RangeInput, RangeWrapper, Wallet, WalletText } from "../orderPanel.styles";
import { ModalContent, ModalWrapper, OrderButton } from "./orderPanel.styles";
import decimalPlaces from "../../../../../../services/decimalPlaces";
import IWallet from "../../../../../../interfaces/Wallet.interface";
import api from "../../../../../../services/api";
import { toast } from "react-toastify";
import LeverageSelect from "./LeverageSelect";
import OrderView from "./OrderView";

interface IModal{
  onClose: () => void;
  balance?: IWallet;
  symbol?: string;
  price: number;
  type: 'buy' | 'sell';
  fetchBalance: () => void;
  fetchPositions: () => void;
}

const Modal: React.FC<IModal> = ({ onClose, balance, symbol, price, type, fetchBalance, fetchPositions }) => {
  const [leverage, setLeverage] = useState(10);
  const [view, setView] = useState(0);

  const handleChangeView = () => {
    setView(1)
  }

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
              price={price} 
              type={type} 
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