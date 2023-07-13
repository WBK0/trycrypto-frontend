import { Col } from "../../../../../../shared/col";
import { Balance, Input, InputSymbol, InputText, InputWrapper, LoginButton, LoginLink, OrderButton, RangeInput } from "../orderPanel.styles";
import IWallet from '../../../../../../interfaces/Wallet.interface';
import { useEffect, useState } from "react";
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

  const handleChangePrice = (e : {target: {value: string}}) => {
    if(balance){
      const decimalNumber = decimalPlaces(e.target.value);
      
      if(Number(e.target.value) <= pairPrice && decimalNumber <= 6){
        setPrice(e.target.value)
      }else if(Number(e.target.value) > pairPrice){
        setPrice(Number(pairPrice).toFixed(6));
        // wyswietlanie bledu że cena jest za duza i nie zmienianie jej
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
    api.post('/api/spot/market/buy/' + symbol?.toUpperCase(), {
      'quantity': orderQuantity
    },{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).then((response: AxiosResponse) => {
      console.log(response.data);
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
        setOrderQuantity("")
    })
    .catch((error: Error) => {
      console.error(error);
      toast.error('Purchase failed', {
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
        <InputText>Cena</InputText>
        <Input value={price} onChange={handleChangePrice} />
        <InputSymbol>USDT</InputSymbol>
      </InputWrapper>
      <InputWrapper>
        <InputText>Ilość</InputText>
        <Input value={orderQuantity || 0} onChange={handleChange}/>
        <InputSymbol>{symbol?.toUpperCase().replace('USDT', '')}</InputSymbol>
      </InputWrapper>
      <RangeInput type="range" min="0" step={0.1} max={balance && (Math.floor(balance?.currentBalance / pairPrice * 10) / 10).toFixed(1)} onChange={handleChange} value={orderQuantity}></RangeInput>
      <InputWrapper>
        <InputText>Suma</InputText>
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