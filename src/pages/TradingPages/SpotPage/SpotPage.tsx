import { useParams } from "react-router-dom";
import TradingLayout from "../../../layout/TradingLayout/TradingLayout";
import styles from './spotPage.module.css';
import { useEffect, useRef, useState } from "react";
import Chart from "../../../components/TradingComponents/SpotComponents/Chart";
import Pair from "../../../components/TradingComponents/SpotComponents/Pair";
import PairInfo from "../../../components/TradingComponents/SpotComponents/PairInfo";
import Loading from './../../../components/Loading/Loading';

interface TradingView {
  widget: (options: any) => any;
}

declare global {
  interface Window {
    TradingView: TradingView;
  }
}

const SpotPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { symbol } = useParams()

  return(
    <>
      <TradingLayout>
        <div className="container">
          <div className="row">
            <Pair symbol={symbol} />
            <div className="col-lg-8 col-12">
              <div className="row">
                <PairInfo symbol={symbol} />
                <Chart symbol={symbol}/>
              </div>
              
            </div>
            <div className="col-2">

            </div>
          </div>
        </div>
      </TradingLayout>
    </>
  )
}

export default SpotPage;