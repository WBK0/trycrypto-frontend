import { useEffect, useRef, useState } from 'react';
import { InputGroup, InputText, Input, SelectContainer, Select, Icon, OptionsContainer, OptionsItem, I } from '../buyCrypto.styles';
import { IData } from '../BuyCrypto';

interface ICryptoAmount {
  cryptoAmount: string;
  handleChangeCrypto: (e: {target: {value: string}}) => void;
  selected: string;
  data: IData;
  setSelected: (value: string) => void;
}

// CryptoAmount component - renders the crypto amount input
const CryptoAmount : React.FC<ICryptoAmount> = ({ cryptoAmount, handleChangeCrypto, selected, data, setSelected}) => {
  const [showOptions, setShowOptions] = useState(false);

  // Refs
  const selectRef = useRef<HTMLDivElement>(null);

  // Handling click outside the select
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };

  // Handling the select of a crypto
  const handleSelect = () => {
    setShowOptions(!showOptions);
  };

  // Adding event listener to the document to handle click outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  

  return(
    <InputGroup>
      <InputText value="Buy" disabled />
      <Input type="text" value={cryptoAmount} onChange={handleChangeCrypto}/>
      <SelectContainer onClick={handleSelect} ref={selectRef}>
        <Select>
          <Icon src={`https://trycrypto.codebybartlomiej.pl/v1/icon/${selected.toLowerCase()}`} />
          {selected}<I className="bi bi-arrow-down-short"></I>
        </Select>
        {showOptions ? (
          <OptionsContainer>
            {Object.entries(data).map(([key, item]) => { 
              return(
              <OptionsItem key={key} onClick={() => setSelected(key.toUpperCase().replace("USDT", ""))}>
                <Icon src={`https://trycrypto.codebybartlomiej.pl/v1/icon/${key.toLowerCase().replace("usdt", "")}`} />
                {key.toUpperCase().replace("USDT", "")}
              </OptionsItem>
            )})}
          </OptionsContainer>
        ) : null}
      </SelectContainer>
    </InputGroup>
  )
}

export default CryptoAmount;