import { SelectButton, Wrapper } from "./selectInstrument.styles";

const SelectInstrument = () => {
  return(
    <Wrapper>
      <SelectButton active={true}>SPOT</SelectButton>
      <SelectButton active={false}>FUTURES</SelectButton>
    </Wrapper>
  )
}

export default SelectInstrument;