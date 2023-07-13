import { useEffect, useState } from "react";
import IWallet from "../../../../../../interfaces/Wallet.interface";
import { Col } from "../../../../../../shared/col";
import { Balance, Input, InputSymbol, InputText, InputWrapper, LoginButton, LoginLink, OrderButton, RangeInput } from "../orderPanel.styles";
import useWallet from "../../../../../../hooks/useWallet";
import decimalPlaces from "../../../../../../services/decimalPlaces";
import api from "../../../../../../services/api";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface ISellPanel {
  balance?: IWallet;
  isLoggedIn: boolean;
  symbol: string | undefined;
  pairPrice: number;
  fetchBalance: () => void;
}

const SellPanel: React.FC<ISellPanel> = ({ balance, isLoggedIn, symbol, pairPrice, fetchBalance }) => {
  const [orderQuantity, setOrderQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleChangePrice = (e : {target: {value: string}}) => {
    if(balance){
      const decimalNumber = decimalPlaces(e.target.value);
      
      if(Number(e.target.value) >= pairPrice && decimalNumber <= 6){
        setPrice(e.target.value)
      }else if(Number(e.target.value) > pairPrice){
        setPrice(Number(pairPrice).toFixed(6));
        // wyswietlanie bledu że cena jest za duza i nie zmienianie jej
      }
    }
  }

  const handleChange = (e : {target: {value: string}}) => {
    if(balance && symbol){
      const decimalNumber = decimalPlaces(e.target.value);

      if(balance && symbol && Number(e.target.value) <= Number(balance?.spotBalance[symbol.toUpperCase()]) && decimalNumber <= 1){
        setOrderQuantity(e.target.value);
      }else if(balance && symbol && Number(e.target.value) && decimalNumber <= 1){
        setOrderQuantity(balance?.spotBalance[symbol.toUpperCase()].toString())
      }
    }
  }

  const handleSubmit = () => {
    api.post('/api/spot/limit/sell/' + symbol?.toUpperCase(), {
      'quantity': Number(orderQuantity),
      'price': Number(price)
    },{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json', // nagłówek typu treści
        'X-Requested-With': 'XMLHttpRequest', // dodatkowy nagłówek
      },
    }).then((response: AxiosResponse) => {
      console.log(response.data);
      fetchBalance();
      toast.success('Successfully ordered ' + orderQuantity + ' ' + symbol?.replace('usdt', '').toUpperCase() + ' at price ' + price + ' USDT to sold', {
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
      toast.error('Sold failed', {
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
    setOrderQuantity("")
  }, [symbol, isLoggedIn])

  return(
    <Col xs={100} md={50} pr="0px" plMd="12px">
      <Balance>
        Dostępne: {symbol && balance?.spotBalance && balance?.spotBalance[symbol.toUpperCase()] ? Number(balance?.spotBalance[symbol?.toUpperCase()]).toFixed(1) : '0'} {symbol?.replace('usdt', '').toUpperCase()}
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
      <RangeInput type="range" min="0" step={0.1} max={balance?.spotBalance && symbol && balance?.spotBalance[symbol.toUpperCase()]} onChange={handleChange} value={orderQuantity}></RangeInput>
      <InputWrapper>
        <InputText>Suma</InputText>
        <Input value={(Number(orderQuantity) * Number(price)).toFixed(4)} readOnly/>
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