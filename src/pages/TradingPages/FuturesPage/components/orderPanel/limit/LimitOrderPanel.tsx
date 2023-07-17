import { useState } from "react";
import { Balance, Button, Hr, Input, InputSymbol, InputText, InputWrapper, OrderButtons, Price, PriceInfo, PriceText, PriceWrapper, RangeInput, RangeWrapper, Wallet, WalletText } from "../orderPanel.styles";
import decimalPlaces from "../../../../../../services/decimalPlaces";
import api from "../../../../../../services/api";
import { toast } from "react-toastify";
import IWallet from "../../../../../../interfaces/Wallet.interface";

interface ILimitOrderPanel{
  pairPrice: number;
  symbol?: string;
  balance?: IWallet;
  fetchBalance: () => void;
  fetchPositions: () => void;
  leverage: number;
}

const LimitOrderPanel: React.FC<ILimitOrderPanel> = ({ pairPrice, symbol, balance, fetchBalance, fetchPositions, leverage }) => {
  const [takeProfit, setTakeProfit] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState("0");
  const [price, setPrice] = useState("");

  const handleChangePrice = (e: {target: {value: string}}) => {
    const decimalNumber = decimalPlaces(e.target.value);
    if(decimalNumber <= 5 && Number(e.target.value) || Number(e.target.value) == 0){
      setPrice(e.target.value)  
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
      console.log(e.target.value)
    }
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

  const onSubmit = async(type : string) => {
    try {
      const response = await api.post('/api/derivatives/limit/open/' + symbol?.toUpperCase(), {
        'type': type,
        'price': Number(price),
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
      if(error.response.data.error_code == 100){
        
      }   
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
      <InputWrapper>
        <InputText>Price</InputText>
        <Input value={price} onChange={handleChangePrice}/>
        <InputSymbol>USDT</InputSymbol>
      </InputWrapper>
      <InputWrapper>
        <InputText>Quantity</InputText>
        <Input value={(Number(orderQuantity) * leverage).toFixed(1)} disabled/>
        <InputSymbol>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
      </InputWrapper>
      <RangeWrapper>
        <RangeInput type="range" min={0} step={0.1} max={balance && Number(price) && (balance.currentBalance / Number(price)).toFixed(1)} onChange={handleChangeOrder}/>
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