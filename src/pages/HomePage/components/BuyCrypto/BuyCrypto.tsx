import { useEffect, useRef, useState } from "react";
import {
  Header,
  Input,
  InputGroup,
  InputSelect,
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

interface Data {
  [key: string]: {
    lastPrice: number;
  };
}

const BuyCrypto: React.FC = () => {
  const [data, setData] = useState<Data>({})
  const [selected, setSelected] = useState('BTC');
  const [showOptions, setShowOptions] = useState(false);
  const [cryptoAmount, setCryptoAmount] = useState("0");
  const [usdtAmount, setUsdtAmount] = useState("0");

  const fetchData = async () => {
    const result = await api.get('/data');
    setData(result.data.spot)
  }

  const selectRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    setCryptoAmount("0");
    setUsdtAmount("0");
  }, [selected])

  const handleChangeCrypto = (e: {target: {value: string}}) => {
    if((Number(e.target.value) || Number(e.target.value) == 0) && decimalPlaces(e.target.value) <= 1){
      setCryptoAmount(e.target.value);
      setUsdtAmount((Number(e.target.value) * (data?.[selected + 'USDT']?.lastPrice ?? 0)).toString());
    }
  }

  useEffect(() => {
    fetchData()
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleBuy = async () => {
    try {
      await api.post('/api/spot/market/buy/' + selected + "USDT", {
        quantity: Number(cryptoAmount)
      })
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

  const handleSelect = () => {
    setShowOptions(!showOptions);
  };

  return (
    <Wrapper>
      <Header>FAST BUY</Header>
      <InputGroup>
        <InputText value="Buy" disabled />
        <Input type="text" value={cryptoAmount} onChange={handleChangeCrypto}/>
        <SelectContainer onClick={handleSelect} ref={selectRef}>
          <Select>
            <Icon src={`https://api.trycrypto.pl/icon/${selected.toLowerCase()}`} />
            {selected}<I className="bi bi-arrow-down-short"></I>
          </Select>
          {showOptions ? (
            <OptionsContainer>
              {Object.entries(data).map(([key, item]) => { 
                return(
                <OptionsItem key={key} onClick={() => setSelected(key.toUpperCase().replace("USDT", ""))}>
                  <Icon src={`https://api.trycrypto.pl/icon/${key.toLowerCase().replace("usdt", "")}`} />
                  {key.toUpperCase().replace("USDT", "")}
                </OptionsItem>
              )})}
            </OptionsContainer>
          ) : null}
        </SelectContainer>
      </InputGroup>
      <InputGroup style={{ marginTop: "50px" }}>
        <InputText value="For" disabled />
        <Input type="text" value={usdtAmount} disabled/>
        <Select>
          <Icon src="https://api.trycrypto.pl/icon/usdt"></Icon>USDT
        </Select>
      </InputGroup>
      <Button onClick={handleBuy}>Buy now</Button>
    </Wrapper>
  );
};

export default BuyCrypto;