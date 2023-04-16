import styles from './spot.module.css'

interface IPair{
  symbol: string | undefined;
}

const Pair: React.FC<IPair> = ({ symbol }) => {
  return(
    <div className='col-lg-2 col-12 ps-0 pe-0 h-100'>
      <div className={`${styles.symbol} d-flex align-items-center justify-content-center`}>
        {symbol?.toUpperCase().replace("USDT", "/USDT")}
      </div>
    </div>
  )
}

export default Pair;