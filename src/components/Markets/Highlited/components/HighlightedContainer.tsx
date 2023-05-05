import HighlitedItem from './HighlightedItem';
import { MarketData } from '../../interfaces/interfaces';
import { Col } from '../../../../shared/col';
import { Heading, HighlitedLink, ItemWrapper } from './styles/highlited.styles';

// Define the interface
interface IHighlitedContainer{
  data: MarketData[];
  text: string;
  condition: any;
  market: string;
}

// This component renders a single highlighted container for the item
const HighlitedContainer : React.FC<IHighlitedContainer> = ({ data, text, condition, market }) => {
  return(
    <Col xs={100} sm={50} xl={25}>
      <ItemWrapper>
        <Heading>{text}</Heading>
        {data
          .sort(condition)
          .slice(0,3)
          .map((item) => (
            <HighlitedLink to={`/market/${market}/${item.pair.toLowerCase()}`} key={item.pair}>
              <HighlitedItem item={item}/>
            </HighlitedLink>
          
        ))} 
      </ItemWrapper>
    </Col>
  )
}

export default HighlitedContainer;