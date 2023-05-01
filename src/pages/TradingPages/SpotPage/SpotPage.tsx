import { useNavigate, useParams } from "react-router-dom";
import TradingLayout from "../../../layout/TradingLayout/TradingLayout";
import { useEffect, useState } from "react";
import Chart from "../../../components/TradingComponents/SpotComponents/Chart";
import Pair from "../../../components/TradingComponents/SpotComponents/Pair";
import PairInfo from "../../../components/TradingComponents/SpotComponents/PairInfo";
import Loading from './../../../components/Loading/Loading';
import { Container } from "../../../shared/container";
import { Row } from "../../../shared/row";
import { Col } from "../../../shared/col";
import OrderBook from "../../../components/TradingComponents/SpotComponents/OrderBook";
import OrderPanel from "../../../components/TradingComponents/SpotComponents/orderPanel";
import LastTrades from "../../../components/TradingComponents/SpotComponents/lastTrades";
import Assets from "../../../components/TradingComponents/SpotComponents/Assets";
import Market from "../../../components/TradingComponents/SpotComponents/Market";
import ResponsiveSelect from "./components/ResponsiveSelect";

interface TradingView {
  widget: (options: any) => any;
}

declare global {
  interface Window {
    TradingView: TradingView;
  }
}

interface IOrderBook {
  asks: [];
  bids: [];
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
  const [orderBook, setOrderBook] = useState<IOrderBook>({
    asks: [],
    bids: []
  })

  useEffect(() => {
    setLoading(true);
    const newSocket = new WebSocket('wss://stream.binance.com/ws/' + symbol + '@ticker' + '/' + symbol + '@depth10');

    newSocket.addEventListener('message', (event) => {
      if(JSON.parse(event.data).e == '24hrTicker'){
        setData(JSON.parse(event.data));
      }else{
        setOrderBook(JSON.parse(event.data));
      }
      setLoading(false)
    });
    addEventListener("error", (event) => {console.log(event)});
    return () => {
      newSocket.close();
    };
  }, [symbol]);

  return(
    <>
    {
      loading ?
      <Loading />
      :
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
              <OrderBook orderBook={orderBook} data={data} />
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
                <OrderPanel symbol={symbol}/>
              </Col>
              <Col lg={20} pr="0px" pb="0px">
                <Assets />
              </Col>
            </Row>          
        </Container>
      </TradingLayout>
      }
    </>
  )
}

export default SpotPage;