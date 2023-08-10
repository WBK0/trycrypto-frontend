import { SelectButton, Wrapper } from "./selectInstrument.styles";

// SelectInstrument interface
interface ISelectInstrument{
  instrument?: string;
  type?: string;
}

// The SelectInstrument component - renders the select instrument
const SelectInstrument: React.FC<ISelectInstrument> = ({ instrument, type }) => {
  return(
    <Wrapper>
      <SelectButton to={`/history/spot/${type}`} active={instrument == 'spot' ? true : false}>SPOT</SelectButton>
      <SelectButton to={`/history/futures/${type}`} active={instrument == 'futures' ? true : false}>FUTURES</SelectButton>
    </Wrapper>
  )
}

export default SelectInstrument;