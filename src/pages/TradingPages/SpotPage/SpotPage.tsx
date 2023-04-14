import { useParams } from "react-router-dom";
import TradingLayout from "../../../layout/TradingLayout/TradingLayout";
import styles from './spotPage.module.css';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const SpotPage: React.FC = () => {

  const {symbol} = useParams()

  return(
    <TradingLayout>
      <div className="container">
        <div className="row">
          <div className='col-lg-2 col-12 ps-0 pe-0 h-100'>
            <div className={`${styles.symbol} d-flex align-items-center justify-content-center`}>
              {symbol?.toUpperCase().replace("USDT", "/USDT")}
            </div>
          </div>
          <div className="col-lg-8 col-12">
            <div className="row">
              <div className={styles.symbolInfo}>
                <div className="row align-items-center h-100">
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>PRICE</p>
                    <p className={`mb-0 ${styles.info}`}>1321.03$</p>
                  </div>
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>24H CHANGE</p>
                    <p className={`mb-0 ${styles.info}`}>213.01$ +13%</p>
                  </div>
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>OPEN PRICE</p>
                    <p className={`mb-0 ${styles.info}`}>1223.21$</p>
                  </div>
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>24H HIGH</p>
                    <p className={`mb-0 ${styles.info}`}>1333.21$</p>
                  </div>
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>24H LOW</p>
                    <p className={`mb-0 ${styles.info}`}>1123.49$</p>
                  </div>
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>24H VOLUME</p>
                    <p className={`mb-0 ${styles.info}`}>12.3M</p>
                  </div>
                  
                </div>
                
              </div>
              <div className="row me-0 ms-0 pe-0 ps-0">
                <div className={styles.chartContainer}>
                  <AdvancedRealTimeChart theme="dark" autosize></AdvancedRealTimeChart>
                </div>
              </div>
            </div>
            
          </div>
          <div className="col-2">

          </div>
        </div>
      </div>
    </TradingLayout>
  )
}

export default SpotPage;