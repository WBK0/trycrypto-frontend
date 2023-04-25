import styles from '../HighlightedTokens.module.css';
import HighlitedItem from './HighlightedItem';
import { MarketData } from '../../interfaces/interfaces';
import { Col } from '../../../../shared/col';
import { Heading, ItemWrapper } from './styles/highlited.styles';

// Define the interface
interface IHighlitedContainer{
  data: MarketData[];
  text: string;
  condition: any;
}

// This component renders a single highlighted container for the item
const HighlitedContainer : React.FC<IHighlitedContainer> = ({ data, text, condition }) => {
  return(
    <Col xs={100} sm={50} xl={25}>
      <ItemWrapper>
        <Heading>{text}</Heading>
        {data
          .sort(condition)
          .slice(0,3)
          .map((item) => (
          <HighlitedItem item={item} key={item.pair}/>
        ))} 
      </ItemWrapper>
    </Col>
  )
}

export default HighlitedContainer;