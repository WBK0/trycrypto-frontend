import { Col } from "../../../../../../shared/col";
import { Balance, Input, InputSymbol, InputText, InputWrapper, LoginButton, LoginLink, OrderButton, RangeInput } from "../orderPanel.styles";
import IWallet from '../../../../../../interfaces/Wallet.interface';
import { useEffect, useRef, useState } from "react";
import decimalPlaces from "../../../../../../services/decimalPlaces";
import api from "../../../../../../services/api";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface IBuyPanel {
  balance?: IWallet;
  isLoggedIn: boolean;
  symbol: string | undefined;
  pairPrice: number;
  fetchBalance: () => void;
}

const BuyPanel: React.FC<IBuyPanel> = ({ balance, isLoggedIn, symbol, pairPrice, fetchBalance }) => {
  const [orderQuantity, setOrderQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isIncorrectPrice, setIsIncorrectPrice] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const inputRefPrice = useRef<HTMLInputElement>(null);
  const inputRefQuantity = useRef<HTMLInputElement>(null);

  const handleChangePrice = (e : {target: {value: string}}) => {
    if(balance){
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

  const handleChange = (e : {target: {value: string}}) => {
    if(balance){
      const decimalNumber = decimalPlaces(e.target.value);
      
      if(Number(e.target.value) <= Number((Math.floor(balance?.currentBalance / Number(price) * 10) / 10).toFixed(1)) && decimalNumber <= 1){
        setOrderQuantity(e.target.value);
      }else if(Number(e.target.value) && decimalNumber <= 1){
        setOrderQuantity((Math.floor(balance?.currentBalance / Number(price) * 10) / 10).toFixed(1))
      }
    }
  }

  const handleSubmit = () => {
    api.post('/api/spot/limit/buy/' + symbol?.toUpperCase(), {
      'quantity': orderQuantity,
      'price': price
    }).then((response: AxiosResponse) => {
      console.log(response.data);
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
        setOrderQuantity("")
        setIsSubmitted(false);
    })
    .catch((error: Error) => {
      console.error(error);
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
    });
  }

  useEffect(() => {
    setOrderQuantity("");
  }, [symbol, isLoggedIn])

  return(
    <Col xs={100} md={50} pr="0px" prMd="12px">
      <Balance>
        Dostępne: {balance?.currentBalance.toFixed(2) || '0'} USDT
      </Balance>
      <InputWrapper>
        <InputText 
          isError={isSubmitted && isIncorrectPrice ? true : false}
          onClick={() => inputRefPrice.current?.focus()}
        >
          Cena
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
          Ilość
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
        <InputText>Suma</InputText>
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