import { useEffect, useRef, useState } from "react";
import { Balance, Button, Hr, Input, InputSymbol, InputText, InputWrapper, OrderButtons, Price, PriceInfo, PriceText, PriceWrapper, RangeInput, RangeWrapper, Wallet, WalletText } from "../../orderPanel.styles";
import decimalPlaces from "../../../../../../../services/decimalPlaces";
import api from "../../../../../../../services/api";
import { toast } from "react-toastify";
import IWallet from "../../../../../../../interfaces/Wallet.interface";

// Interface for component props
interface ILimitOrderPanel{
  pairPrice: number;
  symbol?: string;
  balance?: IWallet;
  fetchBalance: () => void;
  fetchPositions: () => void;
  leverage: number;
}

// LimitOrderPanel component - renders the limit order panel for the futures page
const LimitOrderPanel: React.FC<ILimitOrderPanel> = ({ pairPrice, symbol, balance, fetchBalance, fetchPositions, leverage }) => {
  // Initialising the state
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState(false)
  const [quantityError, setQuantityError] = useState(false);
  const [takeProfitError, setTakeProfitError] = useState(false);
  const [stopLossError, setStopLossError] = useState(false);
  const [quantityInputView, setQuantityInputView] = useState(false);
  
  // Refs
  const inputRefPrice = useRef<HTMLInputElement>(null);
  const inputRefQuantity = useRef<HTMLInputElement>(null);

  // UseEffect for focusing the quantity input when the quantityInputView state is true
  useEffect(() => {
    inputRefQuantity.current?.focus()
  }, [quantityInputView])

  // Function for handling the order quantity input
  const handleChangeQuantity = (e: {target: {value: string}}) => {
    if((Number(e.target.value) || Number(e.target.value) == 0) && decimalPlaces(e.target.value) <= 1){
      setOrderQuantity(e.target.value)
    }
  }

  // Function for hiding the quantity input
  const handleCloseInput = () => {
    setQuantityInputView(false)
  }

  // Function for show the quantity input when the price input is filled in 
  const handleQuantityInput = () => {
    if(price){
      setQuantityInputView(true);
    }
  }

  // Function for handling the price input 
  const handleChangePrice = (e: {target: {value: string}}) => {
    // Checking if the input is a number and has less than 5 decimal places
    const decimalNumber = decimalPlaces(e.target.value);
    if(decimalNumber <= 5 && Number(e.target.value) || Number(e.target.value) == 0){
      setPrice(e.target.value)  
    }
  }

  // Function for handling the quantity order input 
  const handleChangeOrder = (e : {target: {value: string}}) => {
    if(balance){
      // Checking if the input is a number and has less than 1 decimal places
      const decimalNumber = decimalPlaces(e.target.value);
      
      if(Number(e.target.value) <= Number((Math.floor(balance?.currentBalance / Number(price) * 10) / 10).toFixed(1)) && decimalNumber <= 1){
        setOrderQuantity(e.target.value);
      }else if(Number(e.target.value) && decimalNumber <= 1){
        setOrderQuantity((Math.floor(balance?.currentBalance / Number(price) * 10) / 10).toFixed(1))
      }
    }
  }

  // Function for handling the take profit input
  const handleChangeTP = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setTakeProfit(e.target.value);
    }
  }

  // Function for handling the stop loss input
  const handleChangeSL = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setStopLoss(e.target.value);    
    }
  }

  // Function for submitting the limit order 
  const onSubmit = async(type : string) => {
    // Resetting the errors
    setPriceError(false);
    setQuantityError(false);
    setTakeProfitError(false);
    setStopLossError(false);
    try {
      // Posting the order to the api 
      await api.post('/api/derivatives/limit/open/' + symbol?.toUpperCase(), {
        'type': type,
        'price': Number(price),
        'quantity': Number(orderQuantity),
        'leverage': Number(leverage),
        'takeProfit': Number(takeProfit),
        'stopLoss': Number(stopLoss)
      })
      // Showing the success toast
      toast.success(`Successfully opened an ${symbol?.toUpperCase()} position of ${orderQuantity} quantity`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      // Fetching the balance and positions
      fetchBalance();
      fetchPositions();
    } catch (error) {
      let message;
      // Setting the errors if there are any 
      if(type == 'LONG' && Number(price) >= pairPrice || Number(price) == 0){
        setPriceError(true);
        message = 'Price must be lower than the current price'
      }else if(type == 'SHORT' && Number(price) <= pairPrice || Number(price) == 0){
        setPriceError(true);
        message = 'Price must be higher than the current price'
      }
      if(Number(orderQuantity) == 0 || balance?.currentBalance && Number(price) * Number(orderQuantity) > balance?.currentBalance){
        setQuantityError(true);
        message = 'Quantity must be greater than 0 and less than available balance'
      }
      if(Number(takeProfit) != 0 && (
        (type == 'LONG' && (Number(takeProfit) <= Number(price))) || 
        (type == 'SHORT' && (Number(takeProfit) >= Number(price)))
      )){
        message = type === 'LONG' ? 'Take profit must be greater than the current price' : 'Take profit must be less than the current price'
        setTakeProfitError(true);
      }
      if(Number(stopLoss) != 0 && 
        (type == 'LONG' && (Number(stopLoss) >= Number(price) || Number(stopLoss) <= (Number(price) - (Number(price) / leverage))) || 
        (type == 'SHORT') && (Number(stopLoss) <= Number(price) || Number(stopLoss) >= (Number(price) + (Number(price) / leverage))
      ))){
        message = type === 'LONG' ? 'Stop loss must be less than the current price and greater than the entry price' : 'Stop loss must be greater than the current price and less than the entry price'
        setStopLossError(true)
      }
      // Showing the error toast and logging the error
      toast.error(message || `The order was not opened, an error occurred`, {
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
          error={priceError} 
          value={price} 
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
      {quantityInputView
        ?
        <InputWrapper>
        <InputText
          error={quantityError}
          onClick={() => inputRefQuantity.current?.focus()}
        >
          Quantity
        </InputText>
        <Input 
          value={orderQuantity == '0' ? '' : orderQuantity} 
          onChange={handleChangeQuantity}
          error={quantityError}
          ref={inputRefQuantity}
          onBlur={handleCloseInput}
        />
        <InputSymbol
          error={quantityError}
          onClick={() => inputRefQuantity.current?.focus()}
        >
          {symbol?.toUpperCase().replace('USDT', '')}
        </InputSymbol>
      </InputWrapper>
      : 
      <InputWrapper
        onClick={handleQuantityInput}>
        <InputText
          error={quantityError}
        >
          Total
        </InputText>
        <Input 
          value={(Number(orderQuantity) * leverage).toFixed(1)} 
          disabled
          error={quantityError}
        />
        <InputSymbol
          error={quantityError}
        >
          {symbol?.toUpperCase().replace('USDT', '')}
        </InputSymbol>
      </InputWrapper>
      }
      
      <RangeWrapper>
        <RangeInput type="range" min={0} step={0.1} max={balance && Number(price) && (balance.currentBalance / Number(price)).toFixed(1)} onChange={handleChangeOrder} value={orderQuantity}/>
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
        <InputText error={takeProfitError}>Take Profit</InputText>
        <Input error={takeProfitError} value={takeProfit} onChange={handleChangeTP}/>
        <InputSymbol error={takeProfitError}>USDT</InputSymbol>
      </InputWrapper>
      <InputWrapper>
        <InputText error={stopLossError}>Stop Loss</InputText>
        <Input error={stopLossError} value={stopLoss} onChange={handleChangeSL} />
        <InputSymbol error={stopLossError}>USDT</InputSymbol>
      </InputWrapper>
      <OrderButtons>
        <Button orderType="buy" onClick={() => onSubmit('LONG')}>BUY/LONG</Button>
        <Button orderType="sell" onClick={() => onSubmit('SHORT')}>SELL/SHORT</Button>
      </OrderButtons>
      <PriceInfo>
        <PriceWrapper>
          <PriceText>Cost</PriceText>
          <Price>{(Number(orderQuantity) * Number(price)).toFixed(2)} USDT</Price>
        </PriceWrapper>
        <PriceWrapper>
          <PriceText>Cost</PriceText>
          <Price>{(Number(orderQuantity) * Number(price)).toFixed(2)} USDT</Price>
        </PriceWrapper>
      </PriceInfo>
    </>
  )
}

export default LimitOrderPanel;