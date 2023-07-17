import { useParams } from "react-router-dom";
import TradingLayout from "../../../layout/TradingLayout/TradingLayout";
import { useEffect, useState } from "react";
import Chart from "./components/Chart/Chart";
import Pair from "./components/PairSymbol/Pair";
import PairInfo from "./components/PairInfo/PairInfo";
import Loading from './../../../components/Loading/Loading';
import { Container } from "../../../shared/container";
import { Row } from "../../../shared/row";
import { Col } from "../../../shared/col";
import OrderBook from "./components/OrderBook/OrderBook";
import OrderPanel from "./components/OrderPanel/OrderPanel";
import LastTrades from "./components/LastTrades/LastTrades";
import Assets from "./components/SpotAssets/Assets";
import Market from "./components/Markets/Market";
import ResponsiveSelect from "./components/ResponsiveSelect/ResponsiveSelect";
import useWebSocket from "../../../hooks/useWebSocket";
import useWallet from "../../../hooks/useWallet";
import Transactions from "./components/Transactions/Transactions";

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
  const [showResponsive, setShowResponsive] = useState('chart');

  const { symbol } = useParams<{ symbol: string }>()
  const [data, setData] = useState({
    c: 0,
    p: 0,
    P: 0,
    h: 0,
    l: 0,
    o: 0,
    q: 0
  });

  const onMessage = (event: MessageEvent) => {
    setLoading(false)
    setData(JSON.parse(event.data))
  }
  useWebSocket({
    url: 'wss://stream.binance.com/ws/' + symbol + '@ticker',
    onMessage
  });

  const { balance, fetchBalance} = useWallet(); 

  useEffect(() => {
    setLoading(true);
  }, [symbol])
  
  return(
    <>
    {
      loading ? <Loading withNavbar={true}/> : null
    }
      <TradingLayout>
        <Container pr="0px" pl="0px">
          <Row>
            <Col xs={100} lg={24} xl={20} pr="0px" pb="0px">
              <Pair symbol={symbol} />
            </Col>
            <Col xs={100} lg={76} xl={80} pr="0px" pb="0px">
              <PairInfo data={data} />
            </Col>
          </Row>
          <Row>
            <Col xs={100} dLg="none" pb="0px" pr="0px">
              <ResponsiveSelect showResponsive={showResponsive} setShowResponsive={setShowResponsive} />
            </Col>
          </Row>
          <Row>
            <Col xl={20} lg={24} xs={100} dXs={showResponsive == 'orderBook' ? 'block' : 'none'} dLg="block" pr="0px" pb="0px">
              <OrderBook symbol={symbol} data={data}/>
            </Col>
            <Col xl={60} lg={52} xs={100} dXs={showResponsive == 'chart' ? 'block' : 'none'} dLg="block" pr="0px" pb="0px">
              <Chart symbol={symbol}/>
            </Col>
            <Col xl={20} lg={24} xs={100} dXs={showResponsive == 'market' ? 'block' : 'none'} dLg="block"  pr="0px" pb="0px">
              <Market />
            </Col>
          </Row>
            <Row>
              <Col xs={100} dXs={showResponsive == 'trades' ? 'block' : 'none'} dLg="block" lg={20} pr="0px" pb="0px">
                <LastTrades symbol={symbol}/>
              </Col>
              <Col xs={100} lg={60} pr='0px' pb="0px">
                <OrderPanel symbol={symbol} balance={balance} pairPrice={data.c} fetchBalance={fetchBalance}/>
              </Col>
              <Col xs={100} lg={20} pr="0px" pb="0px">
                <Assets wallet={balance}/>
              </Col>
            </Row>
            <Row>
              <Col xs={100} pr='0px' pb="0px">
                <Transactions wallet={balance} symbol={symbol} fetchBalance={fetchBalance} />
              </Col>  
            </Row>          
        </Container>
      </TradingLayout>
    </>
  )
}

export default SpotPage;