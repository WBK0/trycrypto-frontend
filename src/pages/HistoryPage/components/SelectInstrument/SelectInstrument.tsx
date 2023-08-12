import { Link } from "react-router-dom";
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
      <Link to={`/history/spot/${type}`}>
        <SelectButton 
          active={instrument == 'spot'}
          data-tooltip-id="tooltip" 
          data-tooltip-content="Click to select instrument type"
        >SPOT</SelectButton>
      </Link>
      <Link to={`/history/futures/${type}`}>
        <SelectButton 
          active={instrument == 'futures'}
          data-tooltip-id="tooltip" 
          data-tooltip-content="Click to select instrument type"
        >FUTURES</SelectButton>
      </Link>
    </Wrapper>
  )
}

export default SelectInstrument;