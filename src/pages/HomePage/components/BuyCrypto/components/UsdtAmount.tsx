import { InputGroup, InputText, Input, Select, Icon } from '../buyCrypto.styles';

interface IUsdtAmount {
  usdtAmount: string;
}

const UsdtAmount : React.FC<IUsdtAmount> = ({ usdtAmount }) => {
  return(
    <InputGroup style={{ marginTop: "50px" }}>
    <InputText value="For" disabled />
    <Input type="text" value={usdtAmount} disabled/>
    <Select>
      <Icon src="https://trycrypto.codebybartlomiej.pl/v1/icon/usdt"></Icon>USDT
    </Select>
  </InputGroup>
  )
}

export default UsdtAmount;