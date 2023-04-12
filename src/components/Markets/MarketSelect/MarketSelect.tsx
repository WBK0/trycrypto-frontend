import styles from './marketSelect.module.css';

interface IMarketSelect{
  market: string;
  setMarket: (market: string) => void;
}

const MarketSelect : React.FC<IMarketSelect> = ({ market, setMarket }) => {
  return(
    <div className='mt-2'>
      <button className={`btn ${styles.button} ${market === 'spot' ? styles.active : null}`} onClick={() => setMarket('spot')}>Spot Market</button>
      <button className={`btn ${styles.button} ${market === 'futures' ? styles.active : null} ms-2` } onClick={() => setMarket('futures')}>Futures Market</button>
    </div>
  )
}

export default MarketSelect;