import { useEffect, useState } from "react";
import IWallet from "../../../../../../../interfaces/Wallet.interface";
import { Col } from "../../../../../../../shared/col";
import { Balance, Input, InputSymbol, InputText, InputWrapper, LoginButton, LoginLink, OrderButton, RangeInput } from "../../orderPanel.styles";
import decimalPlaces from "../../../../../../../services/decimalPlaces";
import api from "../../../../../../../services/api";
import { toast } from "react-toastify";

// SellPanel interface
interface ISellPanel {
  balance?: IWallet;
  isLoggedIn: boolean;
  symbol: string | undefined;
  pairPrice: number;
  fetchBalance: () => void;
}

// SellPanel component - renders the sell market panel
const SellPanel: React.FC<ISellPanel> = ({ balance, isLoggedIn, symbol, pairPrice, fetchBalance }) => {
  // Initialising the state
  const [orderQuantity, setOrderQuantity] = useState("");

  // Handle change function - handles the change of the input value
  const handleChange = (e : {target: {value: string}}) => {
    if(balance && symbol){
      // Getting the decimal number of the input value
      const decimalNumber = decimalPlaces(e.target.value);

      if(balance && symbol && Number(e.target.value) <= Number(balance?.spotBalance[symbol.toUpperCase()]) && decimalNumber <= 1){
        setOrderQuantity(e.target.value);
      }else if(balance && symbol && Number(e.target.value) && decimalNumber <= 1){
        setOrderQuantity(balance?.spotBalance[symbol.toUpperCase()].toString())
      }
    }
  }

  // Handle submit function - handles the submit of the order
  const handleSubmit = () => {
    try {
      // Sending the request to the API to sell the cryptocurrency
      api.post('/api/spot/market/sell/' + symbol?.toUpperCase(), {
        'quantity': Number(orderQuantity)
      })
      // If the request is successful, fetch the balance and display the success toast
      fetchBalance();
      toast.success('Successfully sold ' + orderQuantity + ' ' + symbol?.replace('usdt', '').toUpperCase(), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      // Reset the order quantity
      setOrderQuantity("")
    } catch (error) {
      // If the request is unsuccessful, display the error toast
      toast.error('Sold failed', {
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

  // Use effect to reset the order quantity when the symbol or the logged in state changes
  useEffect(() => {
    setOrderQuantity("")
  }, [symbol, isLoggedIn])

  return(
    <Col xs={100} md={50} pr="0px" plMd="12px">
      <Balance>
        Available: {symbol && balance?.spotBalance && balance?.spotBalance[symbol.toUpperCase()] ? Number(balance?.spotBalance[symbol?.toUpperCase()]).toFixed(1) : '0'} {symbol?.replace('usdt', '').toUpperCase()}
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
      <RangeInput type="range" min="0" step={0.1} max={balance?.spotBalance && symbol && balance?.spotBalance[symbol.toUpperCase()]} onChange={handleChange} value={Number(orderQuantity)}></RangeInput>
      <InputWrapper>
        <InputText>Total</InputText>
        <Input value={(Number(orderQuantity) * pairPrice).toFixed(4)} readOnly/>
        <InputSymbol>USDT</InputSymbol>
      </InputWrapper>
      {isLoggedIn ?
        <OrderButton orderType="sell" onClick={handleSubmit}>Sell {symbol?.toUpperCase().replace('USDT', '')}</OrderButton>
      :
        <LoginButton>
          <LoginLink to='/login'>Login</LoginLink> or <LoginLink to='/register'>Register</LoginLink>
        </LoginButton>
      }
    </Col>
  )
}

export default SellPanel;