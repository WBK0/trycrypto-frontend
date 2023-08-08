import { useEffect, useRef, useState } from "react";
import {
  Header,
  Input,
  InputGroup,
  InputText,
  Wrapper,
  SelectContainer,
  OptionsContainer,
  OptionsItem,
  Icon,
  Select,
  Button,
  I,
} from "./buyCrypto.styles";
import api from "../../../../services/api";
import decimalPlaces from "../../../../services/decimalPlaces";
import { toast } from "react-toastify";
import CryptoAmount from "./components/CryptoAmount";
import UsdtAmount from "./components/UsdtAmount";

export interface IData {
  [key: string]: {
    lastPrice: number;
  };
}

// BuyCrypto component - renders the buy crypto section on the home page
const BuyCrypto: React.FC = () => {
  // State variables
  const [data, setData] = useState<IData>({})
  const [selected, setSelected] = useState('BTC');
  const [cryptoAmount, setCryptoAmount] = useState("0");
  const [usdtAmount, setUsdtAmount] = useState("0");
  
  // Fetching data from the API
  const fetchData = async () => {
    const result = await api.get('/data');
    setData(result.data.spot)
  }

  // Handling the selection of a crypto
  useEffect(() => {
    setCryptoAmount("0");
    setUsdtAmount("0");
  }, [selected])

  // Handling the change of the crypto amount
  const handleChangeCrypto = (e: {target: {value: string}}) => {
    // Checking if the input is a number and has only one decimal place 
    if((Number(e.target.value) || Number(e.target.value) == 0) && decimalPlaces(e.target.value) <= 1){ 
      setCryptoAmount(e.target.value);
      setUsdtAmount((Number(e.target.value) * (data?.[selected + 'USDT']?.lastPrice ?? 0)).toString());
    }
  }

  // Handling the change of the USDT amount
  useEffect(() => {
    fetchData();
  }, []);

  // handling the buying of the crypto
  const handleBuy = async () => {
    try {
      // Sending the request to the API
      await api.post('/api/spot/market/buy/' + selected + "USDT", {
        quantity: Number(cryptoAmount)
      })
      // Showing the success toast 
      toast.success('The purchase was carried out correctly', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
    } catch (error : any) {
      if(error.response.data.error_code == 110){
        // Showing the error toast if the error is known
        toast.error('You cannot afford to buy this amount of cryptocurrencies', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }else{
        // Showing the error toast if the error is unknown
        toast.error('An unknown error occurred', {
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
  }

  return (
    <Wrapper>
      <Header>FAST BUY</Header>
      <CryptoAmount 
        cryptoAmount={cryptoAmount} 
        data={data} 
        handleChangeCrypto={handleChangeCrypto} 
        selected={selected} 
        setSelected={setSelected} 
      />
      <UsdtAmount 
        usdtAmount={usdtAmount} 
      />
      <Button onClick={handleBuy}>Buy now</Button>
    </Wrapper>
  );
};

export default BuyCrypto;