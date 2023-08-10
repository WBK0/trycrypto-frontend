import { useEffect, useRef, useState } from "react";
import api from "../../../../../../../services/api";
import decimalPlaces from "../../../../../../../services/decimalPlaces";
import { Balance, Input, InputSymbol, InputText, InputWrapper, Price, PriceInfo, PriceText, PriceWrapper, RangeInput, RangeWrapper, Wallet, WalletText } from "../../orderPanel.styles";
import { OrderButton } from "../orderPanel.styles";
import { toast } from "react-toastify";
import IWallet from "../../../../../../../interfaces/Wallet.interface";

// MarketOrder interface
interface IMarketOrder{
  onClose: () => void;
  balance?: IWallet;
  symbol?: string;
  price: number;
  type: 'buy' | 'sell';
  fetchBalance: () => void;
  fetchPositions: () => void;
  leverage: number;
  orderQuantity: string;
  setOrderQuantity: (quantity: string) => void;
  takeProfit: string;
  stopLoss: string;
  setTakeProfit: (takeProfit: string) => void;
  setStopLoss: (stopLoss: string) => void;
}

// MarketOrder component - renders the market order for mobile devices
const MarketOrder: React.FC<IMarketOrder> = ({symbol, fetchBalance, fetchPositions, onClose, leverage, balance, price, type, orderQuantity, setOrderQuantity, takeProfit, setTakeProfit, stopLoss, setStopLoss }) => {
  // Initialising the state
  const [quantityError, setQuantityError] = useState(false);
  const [takeProfitError, setTakeProfitError] = useState(false);
  const [stopLossError, setStopLossError] = useState(false);
  const [quantityView, setQuantityView] = useState(false);
  // Refs
  const inputRefQuantity = useRef<HTMLInputElement>(null);

  // Function to handle the change of quantity view
  const handleChangeView = () => {
    setQuantityView(!quantityView);
  }

  // Function to handle the change of quantity
  const handleChangeQuantity = (e: {target: {value: string}}) => {
    if((Number(e.target.value) || Number(e.target.value) == 0) && decimalPlaces(e.target.value) <= 1){
      setOrderQuantity(e.target.value)
    }
  }

  // Focus on the quantity input when the quantity view changes to true
  useEffect(() => {
    inputRefQuantity.current?.focus();
  }, [quantityView])

  // Function to handle the change of take profit
  const handleChangeTP = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setTakeProfit(e.target.value);
    }
  }

  // Function to handle the change of stop loss
  const handleChangeSL = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setStopLoss(e.target.value);    
    }
  }

  // Function to handle the change of quantity on range input
  const handleChangeOrder = (e : {target: {value: string}}) => {
    if(balance){
      // Get the decimal number of the input
      const decimalNumber = decimalPlaces(e.target.value);
      
      if(Number(e.target.value) <= Number((Math.floor(balance?.currentBalance / price * 10) / 10).toFixed(1)) && decimalNumber <= 1){
        setOrderQuantity(e.target.value);
      }else if(Number(e.target.value) && decimalNumber <= 1){
        setOrderQuantity((Math.floor(balance?.currentBalance / price * 10) / 10).toFixed(1))
      }
    }
  }

  // Function to submit the order to the server
  const onSubmit = async(type : string) => {
    // Reset the errors
    setQuantityError(false);
    setTakeProfitError(false);
    setStopLossError(false);
    try {
      // Send the request to the server to open the position
      await api.post('/api/derivatives/market/open/' + symbol?.toUpperCase(), {
        'type': type,
        'quantity': Number(orderQuantity),
        'leverage': Number(leverage),
        'takeProfit': Number(takeProfit),
        'stopLoss': Number(stopLoss)
      })
      // Toast success message
      toast.success(`Successfully opened an ${symbol?.toUpperCase()} position of ${orderQuantity} quantity`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      // Fetch the balance, positions and close the modal
      fetchBalance();
      fetchPositions();
      onClose();
    } catch (error) {
      // Settings the errors if the error is known
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
      // Toast error message and log the error
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
        <RangeInput type="range" min={0} step={0.1} max={balance && (balance.currentBalance / price).toFixed(1)} onChange={handleChangeOrder}/>
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
          <Price>{(Number(orderQuantity) * price).toFixed(2)} USDT</Price>
        </PriceWrapper>
      </PriceInfo>
      <OrderButton orderType={type} onClick={() => onSubmit(type == 'buy' ? 'LONG' : 'SHORT')}>{type == 'buy' ? 'BUY/LONG' : 'SELL/SHORT'}</OrderButton>
    </>
  )
}

export default MarketOrder;