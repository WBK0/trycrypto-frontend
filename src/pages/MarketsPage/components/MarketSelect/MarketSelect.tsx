import { Row } from '../../../../shared/row';
import { SelectButton } from './marketSelect.styles';

// Define interface
interface IMarketSelect{
  market: string;
  setMarket: (market: string) => void;
}

// Component for selecting the market type
const MarketSelect : React.FC<IMarketSelect> = ({ market, setMarket }) => {
  return(
    <Row mt='25px'>
      <SelectButton
        active={market==='spot' ? true : false}
        onClick={() => setMarket('spot')}
        data-tooltip-id="tooltip" 
        data-tooltip-content="Click to select market instrument"
      >
        Spot Market
      </SelectButton>
      <SelectButton
        active={market==='futures' ? true : false}
        onClick={() => setMarket('futures')}
        data-tooltip-id="tooltip" 
        data-tooltip-content="Click to select market instrument"
      >
        Futures Market
      </SelectButton>
    </Row>
  )
}

export default MarketSelect;