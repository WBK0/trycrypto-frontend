import { useState } from "react";
import { Balance, Button, Hr, Input, InputSymbol, InputText, InputWrapper, LeverageButton, LeverageWrapper, OrderButtons, OrderTypeLink, OrderTypeWrapper, Price, PriceInfo, PriceText, PriceWrapper, RangeInput, RangeWrapper, Wallet, WalletText, Wrapper } from "./orderPanel.styles";
import useWallet from "../../../../../hooks/useWallet";
import Modal from "./components/Modal";
import decimalPlaces from "../../../../../services/decimalPlaces";
import api from "../../../../../services/api";
import IWallet from "../../../../../interfaces/Wallet.interface";

interface IOrderPanel{
  price: number;
  symbol?: string;
  balance?: IWallet;
  fetchBalance: () => void;
  fetchPositions: () => void;
}

const OrderPanel: React.FC<IOrderPanel> = ({ price, symbol, balance, fetchBalance, fetchPositions }) => {
  const [orderType, setOrderType] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [leverage, setLeverage] = useState(11);
  const [showModal, setShowModal] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState("0");

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

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = (lever: number) => {
    setShowModal(false);
    setLeverage(lever)
  };

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

  const onSubmit = async(type : string) => {
    try {
      const response = await api.post('/api/derivatives/market/open/' + symbol?.toUpperCase(), {
        'type': type,
        'quantity': Number(orderQuantity),
        'leverage': Number(leverage)
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
    } catch (error) {
      console.error(error)      
    }
    
  }

  return(
    <Wrapper>
      <LeverageWrapper>
        <LeverageButton onClick={handleShowModal}>{leverage}X</LeverageButton>
      </LeverageWrapper>
      {showModal && (
        <Modal onClose={handleCloseModal} mainLeverage={leverage} onSave={handleSave}/>
      )}
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
      <PriceInfo>
        <PriceWrapper>
          <PriceText>Buy</PriceText>
          <Price>{(Number(orderQuantity) * leverage).toFixed(1)} {symbol?.toUpperCase().replace("USDT", "")}</Price>
        </PriceWrapper>
        <PriceWrapper>
          <PriceText>Sell</PriceText>
          <Price>{(Number(orderQuantity) * leverage).toFixed(1)} {symbol?.toUpperCase().replace("USDT", "")}</Price>
        </PriceWrapper>
      </PriceInfo>
      <Hr />
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
      <OrderButtons>
        <Button orderType="buy" onClick={() => onSubmit('LONG')}>BUY/LONG</Button>
        <Button orderType="sell" onClick={() => onSubmit('SHORT')}>SELL/SHORT</Button>
      </OrderButtons>
      <PriceInfo>
        <PriceWrapper>
          <PriceText>Cost</PriceText>
          <Price>{(Number(orderQuantity) * price).toFixed(2)} USDT</Price>
        </PriceWrapper>
        <PriceWrapper>
          <PriceText>Cost</PriceText>
          <Price>{(Number(orderQuantity) * price).toFixed(2)} USDT</Price>
        </PriceWrapper>
      </PriceInfo>
    </Wrapper>
  )
}

export default OrderPanel;