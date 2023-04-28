import { useParams } from "react-router-dom";
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
  const { symbol } = useParams()

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
    const newSocket = new WebSocket('wss://stream.binance.com/ws/' + symbol + '@ticker' + '/' + symbol + '@depth10');

    newSocket.addEventListener('message', (event) => {
      if(JSON.parse(event.data).e == '24hrTicker'){
        setData(JSON.parse(event.data));
        console.log("chuj")
      }else{
        setOrderBook(JSON.parse(event.data));
      }
      
      setLoading(false)
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return(
    <>
    {
      loading ?
      <Loading />
      :
      <TradingLayout>
        <Container>
          <Row>
            <Col xs={100} lg={15} xl={20} pr="0px" pb="0px">
              <Pair symbol={symbol} />
            </Col>
            <Col xs={100} lg={70} xl={60} pr="0px" pb="0px">
              <PairInfo data={data} />
            </Col>
            <Col xl={20}>
              <div style={{background: 'red', width: '100%'}}></div>
            </Col>
          </Row>
          <Row>
            <Col xs={20} pr="0px" pb="0px">
              <OrderBook orderBook={orderBook} data={data} />
            </Col>
            <Col xs={60} pr="0px" pb="0px">
              <Chart symbol={symbol}/>
            </Col>
          </Row>
            <Row>
              <Col xs={20} pr="0px" pb="0px">
                <LastTrades symbol={symbol}/>
              </Col>
              <Col xs={100} md={60} pr='0px' pb="0px">
                <OrderPanel symbol={symbol}/>
              </Col>
            </Row>          
        </Container>
      </TradingLayout>
      }
    </>
  )
}

export default SpotPage;