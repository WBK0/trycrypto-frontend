import styles from '../HighlightedTokens.module.css';
import { MarketData } from '../../interfaces/interfaces';

// Define the interface
interface IHighlightedToken{
  item: MarketData;
}

// This component renders a single highlighted token item
const HighlitedItem : React.FC<IHighlightedToken> = ({ item }) => {
  return(
    <div key={item.pair} className={styles.container}>
      <div className={styles.leftSide}>
        <img src={"https://api.trycrypto.pl/icon/" + item.pair.replace(/usdt/gi, "").toLowerCase()} alt="Crypto icon" className="me-1"/> 
          {item.pair.replace(/usdt/gi, "")}
      </div>
      <div className={styles.center}>
        {Number(item.lastPrice).toFixed(2)}
      </div>
      <div className={styles.rightSide}>
        {Number(item.percentChange).toFixed(2) + "%"}
      </div>
    </div>
  )
}

export default HighlitedItem;