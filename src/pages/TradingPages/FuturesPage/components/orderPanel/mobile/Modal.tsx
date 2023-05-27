import { useState } from "react";
import { Close } from "../../../../../../shared/modal.styles";
import { Balance, Button, Input, InputSymbol, InputText, InputWrapper, OrderButtons, OrderTypeLink, OrderTypeWrapper, Price, PriceInfo, PriceText, PriceWrapper, RangeInput, RangeWrapper, Wallet, WalletText } from "../orderPanel.styles";
import { ModalContent, ModalWrapper, OrderButton } from "./orderPanel.styles";
import decimalPlaces from "../../../../../../services/decimalPlaces";
import IWallet from "../../../../../../interfaces/Wallet.interface";
import api from "../../../../../../services/api";
import { toast } from "react-toastify";

interface IModal{
  onClose: () => void;
  balance?: IWallet;
  symbol?: string;
  price: number;
  type: 'buy' | 'sell';
}

const Modal: React.FC<IModal> = ({ onClose, balance, symbol, price, type, fetchBalance, fetchPositions }) => {
  const [orderType, setOrderType] = useState(0)
  const [orderQuantity, setOrderQuantity] = useState("0");
  const [leverage, setLeverage] = useState(1);
  const [takeProfit, setTakeProfit] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);

  const handleChangeTP = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setTakeProfit(e.target.value);
    }
  }

  const handleChangeSL = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setStopLoss(e.target.value);    
    }
  }

  const handleChangeOrder = (e : {target: {value: string}}) => {
    if(balance){
      const decimalNumber = decimalPlaces(e.target.value);
      
      if(Number(e.target.value) <= Number((Math.floor(balance?.currentBalance / price * 10) / 10).toFixed(1)) && decimalNumber <= 1){
        setOrderQuantity(e.target.value);
      }else if(Number(e.target.value) && decimalNumber <= 1){
        setOrderQuantity((Math.floor(balance?.currentBalance / price * 10) / 10).toFixed(1))
      }
      console.log(e.target.value)
    }
  }

  const onSubmit = async(type : string) => {
    try {
      const response = await api.post('/api/derivatives/market/open/' + symbol?.toUpperCase(), {
        'type': type,
        'quantity': Number(orderQuantity),
        'leverage': Number(leverage),
        'takeProfit': Number(takeProfit),
        'stopLoss': Number(stopLoss)
      },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
      console.log(response)
      fetchBalance();
      fetchPositions();
      toast.success(`Successfully opened an ${symbol?.toUpperCase()} position of ${orderQuantity} quantity`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      console.error(error)      
      toast.error(`Position not opened, unknown error occurred`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
    }

  }

  return(
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
        <Close onClick={onClose}>X</Close>
        <OrderTypeWrapper>
          <OrderTypeLink onClick={() => setOrderType(0)} active={orderType == 0 ? true : false}>Market</OrderTypeLink>
          <OrderTypeLink onClick={() => setOrderType(1)} active={orderType == 1 ? true : false}>Limit</OrderTypeLink>
        </OrderTypeWrapper>
        <Wallet>
          <WalletText>Available:</WalletText> 
          <Balance>{balance?.currentBalance.toFixed(2) || 0} USDT</Balance>
        </Wallet>
        <InputWrapper>
          <InputText>Quantity</InputText>
          <Input value={(Number(orderQuantity) * leverage).toFixed(1)} disabled/>
          <InputSymbol>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
        </InputWrapper>
        <RangeWrapper>
          <RangeInput type="range" min={0} step={0.1} max={balance && (balance.currentBalance / price).toFixed(1)} onChange={handleChangeOrder}/>
        </RangeWrapper>
        <InputWrapper>
          <InputText>Take Profit</InputText>
          <Input value={takeProfit} onChange={handleChangeTP}/>
          <InputSymbol>USDT</InputSymbol>
        </InputWrapper>
        <InputWrapper>
          <InputText>Stop Loss</InputText>
          <Input value={stopLoss} onChange={handleChangeSL} />
          <InputSymbol>USDT</InputSymbol>
        </InputWrapper>
        <PriceInfo>
          <PriceWrapper>
            <PriceText>Cost</PriceText>
            <Price>{(Number(orderQuantity) * price).toFixed(2)} USDT</Price>
          </PriceWrapper>
        </PriceInfo>
        <OrderButton orderType={type} onClick={() => onSubmit('LONG')}>BUY/LONG</OrderButton>
      </ModalContent>
    </ModalWrapper>
  )
}

export default Modal;