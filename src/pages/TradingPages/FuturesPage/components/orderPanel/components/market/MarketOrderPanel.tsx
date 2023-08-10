import { useEffect, useRef, useState } from "react";
import { Balance, Button, Hr, Input, InputSymbol, InputText, InputWrapper, OrderButtons, Price, PriceInfo, PriceText, PriceWrapper, RangeInput, RangeWrapper, Wallet, WalletText } from "../../orderPanel.styles";
import decimalPlaces from "../../../../../../../services/decimalPlaces";
import api from "../../../../../../../services/api";
import { toast } from "react-toastify";
import IWallet from "../../../../../../../interfaces/Wallet.interface";

// Market order panel interface
interface IMarketOrderPanel{
  price: number;
  symbol?: string;
  balance?: IWallet;
  fetchBalance: () => void;
  fetchPositions: () => void;
  leverage: number;
}

// Market order panel component - renders the market order panel
const MarketOrderPanel: React.FC<IMarketOrderPanel> = ({ price, symbol, balance, fetchBalance, fetchPositions, leverage }) => {
  // Initialising the state
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("");
  const [quantityError, setQuantityError] = useState(false);
  const [takeProfitError, setTakeProfitError] = useState(false);
  const [stopLossError, setStopLossError] = useState(false);
  const [quantityView, setQuantityView] = useState(false);
  // Refs
  const inputRefQuantity = useRef<HTMLInputElement>(null);

  // Function for changing the view of the quantity input
  const handleChangeView = () => {
    setQuantityView(!quantityView);
  }

  // Function for changing the quantity input
  const handleChangeQuantity = (e: {target: {value: string}}) => {
    if((Number(e.target.value) || Number(e.target.value) == 0) && decimalPlaces(e.target.value) <= 1){
      setOrderQuantity(e.target.value)
    }
  }

  // Function for focusing the quantity input when the quantity view is changed to true 
  useEffect(() => {
    inputRefQuantity.current?.focus();
  }, [quantityView])

  // Function for changing the order quantity range input
  const handleChangeOrder = (e : {target: {value: string}}) => {
    if(balance){
      // Get the decimal number of the input value
      const decimalNumber = decimalPlaces(e.target.value);
      
      if(Number(e.target.value) <= Number((Math.floor(balance?.currentBalance / price * 10) / 10).toFixed(1)) && decimalNumber <= 1){
        setOrderQuantity(e.target.value);
      }else if(Number(e.target.value) && decimalNumber <= 1){
        setOrderQuantity((Math.floor(balance?.currentBalance / price * 10) / 10).toFixed(1))
      }
    }
  }

  // Function for changing the take profit input
  const handleChangeTP = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setTakeProfit(e.target.value);
    }
  }

  // Function for changing the stop loss input
  const handleChangeSL = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setStopLoss(e.target.value);    
    }
  }

  // Submit function for opening a market order
  const onSubmit = async(type : string) => {
    // Resetting the errors
    setQuantityError(false);
    setTakeProfitError(false);
    setStopLossError(false);
    try {
      // Sending the request to the server to open a market order
      await api.post('/api/derivatives/market/open/' + symbol?.toUpperCase(), {
        'type': type,
        'quantity': Number(orderQuantity),
        'leverage': Number(leverage),
        'takeProfit': Number(takeProfit),
        'stopLoss': Number(stopLoss)
      })
      // Toast message for successfully opening a market order
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
      // Setting the errors if the request fails
      if(Number(orderQuantity) == 0 || (balance?.currentBalance && Number(orderQuantity) >= balance?.currentBalance / price)){
        setQuantityError(true);
      }
      if(Number(takeProfit) != 0 && (
        (type == 'LONG' && (Number(takeProfit) <= Number(price))) || 
        (type == 'SHORT' && (Number(takeProfit) >= Number(price)))
      )){
        setTakeProfitError(true);
      }
      if(Number(stopLoss) != 0 && 
        (type == 'LONG' && (Number(stopLoss) >= price || Number(stopLoss) <= (Number(price) - (Number(price) / leverage))) || 
        (type == 'SHORT') && (Number(stopLoss) <= price || Number(stopLoss) >= (Number(price) + (Number(price) / leverage))
      ))){
        setStopLossError(true)
      }
      // Toast message for failing to open a market order and logging the error
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
    <>
      <Wallet>
        <WalletText>Available:</WalletText> 
        <Balance>{balance?.currentBalance.toFixed(2) || 0} USDT</Balance>
      </Wallet>
      {
        quantityView 
        ?
          <InputWrapper onClick={handleChangeView} onBlur={handleChangeView}>
            <InputText>Quantity</InputText>
            <Input value={orderQuantity == '0' ? '' : orderQuantity} onChange={handleChangeQuantity} ref={inputRefQuantity}/>
            <InputSymbol>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
          </InputWrapper>
        :
          <InputWrapper onClick={handleChangeView}>
            <InputText error={quantityError}>Total</InputText>
            <Input error={quantityError} value={(Number(orderQuantity) * leverage).toFixed(1)} disabled/>
            <InputSymbol error={quantityError}>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
          </InputWrapper>
        }
      <RangeWrapper>
        <RangeInput type="range" min={0} step={0.1} max={balance && (balance.currentBalance / price).toFixed(1)} onChange={handleChangeOrder} value={orderQuantity}/>
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
          <Price>{(Number(orderQuantity) * price).toFixed(2)} USDT</Price>
        </PriceWrapper>
        <PriceWrapper>
          <PriceText>Cost</PriceText>
          <Price>{(Number(orderQuantity) * price).toFixed(2)} USDT</Price>
        </PriceWrapper>
      </PriceInfo>
    </>
  )
}

export default MarketOrderPanel;