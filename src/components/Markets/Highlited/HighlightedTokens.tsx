import HighlitedContainer from './components/HighlightedContainer';
import { MarketData } from '../interfaces/interfaces';
import { Row } from '../../../shared/row';

// Define the interface
interface IHighlightedTokens{
  data: Array<MarketData>;
}

const HighlightedTokens: React.FC<IHighlightedTokens> = ({ data }) => {
  return(
    <Row mt='20px'>
      {data.length > 0 ?
        // Render four HighlitedContainer components with different prop values
        <>
          <HighlitedContainer 
            data={data} 
            text={'Highest volume'}
            condition={(a: {volume: number}, b: {volume: number}) => b.volume - a.volume}
          />
          <HighlitedContainer 
            data={data} 
            text={'Highest prices'}
            condition={(a: {lastPrice: number}, b: {lastPrice: number}) => b.lastPrice - a.lastPrice}
          />
          <HighlitedContainer 
            data={data} 
            text={'Highest changes'}
            condition={(a: {percentChange: number}, b: {percentChange: number}) => b.percentChange - a.percentChange}
          />
          <HighlitedContainer 
            data={data} 
            text={'Highest growth'}
            condition={(a: {highPrice: number, openPrice: number}, b: {highPrice: number, openPrice: number}) => (b.highPrice - b.openPrice) - (a.highPrice - a.openPrice)}
          />
        </>
        : null
      }
    </Row>
  )
}

export default HighlightedTokens;