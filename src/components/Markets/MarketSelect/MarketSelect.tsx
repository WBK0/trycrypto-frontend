import styles from './marketSelect.module.css';

// Define interface
interface IMarketSelect{
  market: string;
  setMarket: (market: string) => void;
}

// Component for selecting the market type
const MarketSelect : React.FC<IMarketSelect> = ({ market, setMarket }) => {
  return(
    <div className='mt-2'>
      <button 
        className={`btn ${styles.button} ${market === 'spot' ? styles.active : null}`} 
        onClick={() => setMarket('spot')}
      >
        Spot Market
      </button>
      <button 
        className={`btn ${styles.button} ${market === 'futures' ? styles.active : null} ms-2` } 
        onClick={() => setMarket('futures')}
      >
        Futures Market
      </button>
    </div>
  )
}

export default MarketSelect;