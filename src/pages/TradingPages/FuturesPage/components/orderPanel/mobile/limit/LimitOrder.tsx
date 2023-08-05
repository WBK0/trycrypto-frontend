import { useEffect, useRef, useState } from "react";
import api from "../../../../../../../services/api";
import decimalPlaces from "../../../../../../../services/decimalPlaces";
import { Balance, Input, InputSymbol, InputText, InputWrapper, Price, PriceInfo, PriceText, PriceWrapper, RangeInput, RangeWrapper, Wallet, WalletText } from "../../orderPanel.styles";
import { OrderButton } from "../orderPanel.styles";
import { toast } from "react-toastify";
import IWallet from "../../../../../../../interfaces/Wallet.interface";

interface ILimitOrder{
  onClose: () => void;
  balance?: IWallet;
  symbol?: string;
  pairPrice: number;
  type: 'buy' | 'sell';
  fetchBalance: () => void;
  fetchPositions: () => void;
  leverage: number;
  orderQuantity: string;
  setOrderQuantity: (quantity: string) => void;
  takeProfit: string;
  stopLoss: string;
  price: string;
  setTakeProfit: (takeProfit: string) => void;
  setStopLoss: (stopLoss: string) => void;
  setPrice: (price: string) => void;
}

const LimitOrder: React.FC<ILimitOrder> = ({symbol, fetchBalance, fetchPositions, onClose, leverage, balance, pairPrice, type, orderQuantity, setOrderQuantity, takeProfit, setTakeProfit, stopLoss, setStopLoss, price, setPrice }) => {
  const [quantityView, setQuantityView] = useState(false);
  const [priceError, setPriceError] = useState(false)
  const [quantityError, setQuantityError] = useState(false);
  const [takeProfitError, setTakeProfitError] = useState(false);
  const [stopLossError, setStopLossError] = useState(false);
  const inputRefQuantity = useRef<HTMLInputElement>(null);
  const inputRefPrice = useRef<HTMLInputElement>(null);

  const handleChangeQuantity = (e: {target: {value: string}}) => {
    if((Number(e.target.value) || Number(e.target.value) == 0) && decimalPlaces(e.target.value) <= 1){
      setOrderQuantity(e.target.value)
    }
  }

  const handleChangeView = () => {
    if(price){
      setQuantityView(!quantityView);
    }
  }

  const handleChangePrice = (e: {target: {value: string}}) => {
    setPrice(e.target.value)
  }

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
      
      if(Number(e.target.value) <= Number((Math.floor(balance?.currentBalance / Number(price) * 10) / 10).toFixed(1)) && decimalNumber <= 1){
        setOrderQuantity(e.target.value);
      }else if(Number(e.target.value) && decimalNumber <= 1){
        setOrderQuantity((Math.floor(balance?.currentBalance / Number(price) * 10) / 10).toFixed(1))
      }
    }
  }

  const onSubmit = async(type : string) => {
    setPriceError(false);
    setQuantityError(false);
    setTakeProfitError(false);
    setStopLossError(false);
    try {
      const response = await api.post('/api/derivatives/limit/open/' + symbol?.toUpperCase(), {
        'type': type,
        'price': price,
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
      onClose();
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
      if(type == 'LONG' && Number(price) >= pairPrice || Number(price) == 0){
        setPriceError(true);
      }else if(type == 'SHORT' && Number(price) <= pairPrice || Number(price) == 0){
        setPriceError(true);
      }
      if(Number(orderQuantity) == 0 || balance?.currentBalance && Number(price) * Number(orderQuantity) > balance?.currentBalance){
        setQuantityError(true);
      }
      if(Number(takeProfit) != 0 && (
        (type == 'LONG' && (Number(takeProfit) <= Number(price))) || 
        (type == 'SHORT' && (Number(takeProfit) >= Number(price)))
      )){
        setTakeProfitError(true);
      }
      if(Number(stopLoss) != 0 && 
        (type == 'LONG' && (Number(stopLoss) >= Number(price) || Number(stopLoss) <= (Number(price) - (Number(price) / leverage))) || 
        (type == 'SHORT') && (Number(stopLoss) <= Number(price) || Number(stopLoss) >= (Number(price) + (Number(price) / leverage))
      ))){
        setStopLossError(true)
      }
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

  useEffect(() => {
    inputRefQuantity.current?.focus()
  }, [quantityView])

  return(
    <>
      <Wallet>
        <WalletText>Available:</WalletText> 
        <Balance>{balance?.currentBalance.toFixed(2) || 0} USDT</Balance>
      </Wallet>
      <InputWrapper>
        <InputText 
          error={priceError}
          onClick={() => inputRefPrice.current?.focus()}
        >
          Price
        </InputText>
        <Input 
          value={price} 
          error={priceError} 
          onChange={handleChangePrice} 
          ref={inputRefPrice}
        />
        <InputSymbol 
          error={priceError}
          onClick={() => inputRefPrice.current?.focus()}
        >
          USDT
        </InputSymbol>
      </InputWrapper>
      {
        quantityView
        ?
          <InputWrapper onBlur={handleChangeView}>
            <InputText>Quantity</InputText>
            <Input value={orderQuantity == '0' ? '' : orderQuantity} onChange={handleChangeQuantity} ref={inputRefQuantity}/>
            <InputSymbol>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
          </InputWrapper>
        :  
          <InputWrapper onClick={handleChangeView}>
            <InputText error={quantityError}>Total</InputText>
            <Input value={(Number(orderQuantity) * leverage).toFixed(1)} disabled error={quantityError}/>
            <InputSymbol error={quantityError}>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
          </InputWrapper>   
      }
      <RangeWrapper>
        <RangeInput type="range" min={0} step={0.1} max={balance && (Number(price) > 0) ? (balance.currentBalance / Number(price)).toFixed(1) : 0} onChange={handleChangeOrder} value={Number(orderQuantity)}/>
      </RangeWrapper>
      <InputWrapper>
        <InputText error={takeProfitError}>Take Profit</InputText>
        <Input error={takeProfitError} value={takeProfit} onChange={handleChangeTP}/>
        <InputSymbol error={takeProfitError}>USDT</InputSymbol>
      </InputWrapper>
      <InputWrapper>
        <InputText error={stopLossError}>Stop Loss</InputText>
        <Input error={stopLossError} value={stopLoss} onChange={handleChangeSL} />
        <InputSymbol error={stopLossError}>USDT</InputSymbol>
      </InputWrapper>
      <PriceInfo>
        <PriceWrapper>
          <PriceText>Cost</PriceText>
          <Price>{(Number(orderQuantity) * Number(price)).toFixed(2)} USDT</Price>
        </PriceWrapper>
      </PriceInfo>
      <OrderButton orderType={type} onClick={() => onSubmit(type == 'buy' ? 'LONG' : 'SHORT')}>{type == 'buy' ? 'BUY/LONG' : 'SELL/SHORT'}</OrderButton>
    </>
  )
}

export default LimitOrder;