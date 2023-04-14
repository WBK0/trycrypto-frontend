import Navbar from "../Navbar/Navbar";
import styles from './tradingLayout.module.css'

interface ITradingLayout{
  children: React.ReactNode;
}

const TradingLayout: React.FC<ITradingLayout> = ({ children }) => {
  return(
    <div>
      <Navbar />
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}

export default TradingLayout;