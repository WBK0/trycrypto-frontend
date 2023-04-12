import styles from '../HighlightedTokens.module.css';
import HighlitedItem from './HighlightedItem';
import { MarketData } from '../../../interfaces/interfaces';

// Define the interface
interface IHighlitedContainer{
  data: MarketData[];
  text: string;
  condition: any;
}

// This component renders a single highlighted container for the item
const HighlitedContainer : React.FC<IHighlitedContainer> = ({ data, text, condition }) => {
  return(
    <div className="col-xl-3 col-lg-6 col-12 mb-3">
      <div className={styles.highlitedContainer}>
        <p className={styles.header}>{text}</p>
        {data
          .sort(condition)
          .slice(0,3)
          .map((item) => (
          <HighlitedItem item={item} key={item.pair}/>
        ))} 
      </div>
    </div>
  )
}

export default HighlitedContainer;