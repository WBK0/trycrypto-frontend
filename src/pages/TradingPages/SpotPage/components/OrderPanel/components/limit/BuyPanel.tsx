import { Col } from "../../../../../../../shared/col";
import { Balance, Input, InputSymbol, InputText, InputWrapper, LoginButton, LoginLink, OrderButton, RangeInput } from "../../orderPanel.styles";
import IWallet from '../../../../../../../interfaces/Wallet.interface';
import { useEffect, useRef, useState } from "react";
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

// BuyPanel component - renders the buy limit panel
const BuyPanel: React.FC<IBuyPanel> = ({ balance, isLoggedIn, symbol, pairPrice, fetchBalance }) => {
  // Initialising the state
  const [orderQuantity, setOrderQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isIncorrectPrice, setIsIncorrectPrice] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false)
  // Refs
  const inputRefPrice = useRef<HTMLInputElement>(null);
  const inputRefQuantity = useRef<HTMLInputElement>(null);

  // Handle change function - handles the change of the price input value
  const handleChangePrice = (e : {target: {value: string}}) => {
    if(balance){
      // Get the decimal number of the input value
      const decimalNumber = decimalPlaces(e.target.value);
      
      if(Number(e.target.value) <= pairPrice && decimalNumber <= 5){
        setPrice(e.target.value)
        setIsIncorrectPrice(false);
      }else if(Number(e.target.value) > pairPrice){
        setPrice(e.target.value);
        setIsIncorrectPrice(true);
      }
    }
  }


  // Handle change function - handles the change of the quantity input value
  const handleChange = (e : {target: {value: string}}) => {
    if(balance){
      // Get the decimal number of the input value
      const decimalNumber = decimalPlaces(e.target.value);
      
      if(Number(e.target.value) <= Number((Math.floor(balance?.currentBalance / Number(price) * 10) / 10).toFixed(1)) && decimalNumber <= 1){
        setOrderQuantity(e.target.value);
      }else if(Number(e.target.value) && decimalNumber <= 1){
        setOrderQuantity((Math.floor(balance?.currentBalance / Number(price) * 10) / 10).toFixed(1))
      }
    }
  }

  // Handle submit function - handles the submit of the order
  const handleSubmit = () => {
    try {
      // Post the order to the API
      api.post('/api/spot/limit/buy/' + symbol?.toUpperCase(), {
        'quantity': orderQuantity,
        'price': price
      })
      // If the order is successful, fetch the balance and display the toast
      fetchBalance();
      toast.success('Successfully ordered ' + orderQuantity + ' ' + symbol?.replace('usdt', '').toUpperCase() + ' at a price of ' + price + ' USDT' + ' to buy', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      // Reset the input values and the isSubmitted state
      setOrderQuantity("")
      setIsSubmitted(false);
    } catch (error) {
      // If the order is unsuccessful, display the toast and set the isSubmitted state
      setIsSubmitted(true);
      toast.error('Order creation failed', {
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

  // Use effect - resets the input values when the symbol changes
  useEffect(() => {
    setOrderQuantity("");
  }, [symbol, isLoggedIn])

  return(
    <Col xs={100} md={50} pr="0px" prMd="12px">
      <Balance>
        Available: {balance?.currentBalance.toFixed(2) || '0'} USDT
      </Balance>
      <InputWrapper>
        <InputText 
          isError={isSubmitted && isIncorrectPrice ? true : false}
          onClick={() => inputRefPrice.current?.focus()}
        >
          Price
        </InputText>
        <Input 
          isError={isSubmitted && isIncorrectPrice ? true : false} 
          value={price} 
          onChange={handleChangePrice}
          ref={inputRefPrice}
        />
        <InputSymbol 
          isError={isSubmitted && isIncorrectPrice ? true : false}           
          onClick={() => inputRefPrice.current?.focus()}
        >
          USDT
        </InputSymbol>
      </InputWrapper>
      <InputWrapper>
        <InputText 
          isError={isSubmitted && Number(orderQuantity) <= 0 ? true : false}
          onClick={() => inputRefQuantity.current?.focus()}
        >
          Quantity
        </InputText>
        <Input 
          isError={isSubmitted && Number(orderQuantity) <= 0 ? true : false} 
          value={orderQuantity} 
          onChange={handleChange}
          ref={inputRefQuantity}
          disabled={Number(price) <= 0 ? true : false}
        />
        <InputSymbol 
          isError={isSubmitted && Number(orderQuantity) <= 0 ? true : false}
          onClick={() => inputRefQuantity.current?.focus()}
        >
          {symbol?.toUpperCase().replace('USDT', '')}
        </InputSymbol>
      </InputWrapper>
      <RangeInput type="range" min="0" step={0.1} max={balance && Number(price) > 0 ? (Math.floor(balance?.currentBalance / Number(price) * 10) / 10).toFixed(1) : 0} onChange={handleChange} value={Number(orderQuantity)}></RangeInput>
      <InputWrapper>
        <InputText>Total</InputText>
        <Input value={(Number(orderQuantity) * Number(price)).toFixed(4)} readOnly/>
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