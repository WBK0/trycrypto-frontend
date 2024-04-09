import { Col } from "../../../../../../../shared/col";
import { Balance, Input, InputSymbol, InputText, InputWrapper, LoginButton, LoginLink, OrderButton, RangeInput } from "../../orderPanel.styles";
import IWallet from '../../../../../../../interfaces/Wallet.interface';
import { useEffect, useState } from "react";
import decimalPlaces from "../../../../../../../services/decimalPlaces";
import api from "../../../../../../../services/api";
import { toast } from "react-toastify";

// BuyPanel interface
interface IBuyPanel {
  balance?: IWallet;
  isLoggedIn: boolean;
  symbol: string | undefined;
  pairPrice: number;
  fetchBalance: () => void;
}

// BuyPanel component - renders the buy market panel
const BuyPanel: React.FC<IBuyPanel> = ({ balance, isLoggedIn, symbol, pairPrice, fetchBalance }) => {
  // Initialising the state
  const [orderQuantity, setOrderQuantity] = useState("0");

  // Handle change function - handles the change of the input value
  const handleChange = (e : {target: {value: string}}) => {
    if(balance){
      // Getting the decimal number of the input value
      const decimalNumber = decimalPlaces(e.target.value);
      
      if((Number(e.target.value) <= Number((Math.floor(balance?.currentBalance / pairPrice * 10) / 10).toFixed(1)) && decimalNumber <= 1)){
        setOrderQuantity(e.target.value);
      }else if(Number(e.target.value) && decimalNumber <= 1){
        setOrderQuantity((Math.floor(balance?.currentBalance / pairPrice * 10) / 10).toFixed(1))
      }
    }
  }

  // Handle submit function - handles the submit of the order
  const handleSubmit = () => {
    if(Number(orderQuantity) === 0 ){
      toast.error("Quantity must be greater than 0", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    try {
      // Sending the request to the API to buy the cryptocurrency
      api.post('/api/spot/market/buy/' + symbol?.toUpperCase(),{
        'quantity': orderQuantity
      })
      // If the request is successful, fetch the balance and display the success toast
      fetchBalance();
      toast.success('Successfully purchased ' + orderQuantity + ' ' + symbol?.replace('usdt', '').toUpperCase(), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
        setOrderQuantity("");
    } catch (error) {
      // If the request is unsuccessful, display the error toast
      toast.error('Purchase failed', {
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

  // Sets the order quantity to empty string when the symbol and the login status changes
  useEffect(() => {
    setOrderQuantity("");
  }, [symbol, isLoggedIn])

  return(
    <Col xs={100} md={50} pr="0px" prMd="12px">
      <Balance>
        Available: {balance?.currentBalance.toFixed(2) || '0'} USDT
      </Balance>
      <InputWrapper>
        <InputText>Price</InputText>
        <Input value="Market" disabled />
        <InputSymbol>USDT</InputSymbol>
      </InputWrapper>
      <InputWrapper>
        <InputText>Quantity</InputText>
        <Input value={orderQuantity} onChange={handleChange}/>
        <InputSymbol>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
      </InputWrapper>
      <RangeInput type="range" min="0" step={0.1} max={balance && (Math.floor(balance?.currentBalance / pairPrice * 10) / 10).toFixed(1)} onChange={handleChange} value={Number(orderQuantity)}></RangeInput>
      <InputWrapper>
        <InputText>Total</InputText>
        <Input value={(Number(orderQuantity) * pairPrice).toFixed(4)} readOnly/>
        <InputSymbol>USDT</InputSymbol>
      </InputWrapper>
      {isLoggedIn ?
        <OrderButton orderType="buy" onClick={handleSubmit}>Buy {symbol?.toUpperCase().replace('USDT', '')}</OrderButton>
      :
        <LoginButton>
          <LoginLink to='/login'>Login</LoginLink> or <LoginLink to='/register'>Register</LoginLink>
        </LoginButton>
      }
    </Col>
  )
}

export default BuyPanel;