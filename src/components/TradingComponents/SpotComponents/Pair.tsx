import styles from './spot.module.css'

interface IPair{
  symbol: string | undefined;
}

const Pair: React.FC<IPair> = ({ symbol }) => {
  return(
    <div className='row' style={{margin: 0}}>
      <div className={`${styles.symbol} d-flex align-items-center justify-content-center`}>
        {symbol?.toUpperCase().replace("USDT", "/USDT")}
      </div>
    </div>
    
  )
}

export default Pair;