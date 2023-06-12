import { SelectButton, Wrapper } from "./selectInstrument.styles";

interface ISelectInstrument{
  instrument: 0 | 1;
  setInstrument: (value: 0 | 1) => void;
}

const SelectInstrument: React.FC<ISelectInstrument> = ({ instrument, setInstrument }) => {
  return(
    <Wrapper>
      <SelectButton active={instrument == 0 ? true : false} onClick={() => setInstrument(0)}>SPOT</SelectButton>
      <SelectButton active={instrument == 1 ? true : false} onClick={() => setInstrument(1)}>FUTURES</SelectButton>
    </Wrapper>
  )
}

export default SelectInstrument;