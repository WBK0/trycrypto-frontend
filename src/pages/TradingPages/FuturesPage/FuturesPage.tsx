import { useParams } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Row } from "../../../shared/row";
import { Col } from "../../../shared/col";
import Symbol from "./components/symbol/Symbol";
import useWebSocket from "../../../hooks/useWebSocket";
import { useEffect, useState } from "react";
import SymbolInfo from "./components/symbolInfo/SymbolInfo";
import OrderBook from "./components/orderbook/OrderBook";
import Chart from "./components/chart/Chart";
import LastTrades from "./components/lastTrades/LastTrades";
import OrderPanel from "./components/orderPanel/OrderPanel";
import InfoPanel from "./components/infoPanel/InfoPanel";
import useWallet from "../../../hooks/useWallet";
import api from "../../../services/api";
import ResponsiveSelect from "./components/responsiveSelect/ResponsiveSelect";
import OrderPanelMobile from "./components/orderPanel/mobile/OrderPanel";
import Loading from "../../../components/Loading/Loading";

export interface IPositions{
  id: number;
  type: string;
  pair: string;
  leverage: number;
  quantity: number;
  purchasePrice: number;
  takeProfit?: number;
  stopLoss?: number;
  liquidationPrice: number;
}

const FuturesPage = () => {
  const [data, setData] = useState({
    c: 0,
    p: 0,
    P: 0,
    h: 0,
    l: 0,
    o: 0,
    q: 0
  });
  const [positions, setPositions] = useState<IPositions[]>([])
  const { symbol } = useParams()
  const { balance, fetchBalance } = useWallet();
  const [showResponsive, setShowResponsive] = useState('chart');
  const [loading, setLoading] = useState(true);

  const fetchPositions = async () => {
    try {
      const response = await api.get('/api/positions/futures', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      })
      setPositions(response.data)
    } catch (error) {
      console.error(error)
    } 
  }

  const onMessage = (event: MessageEvent) => {
    setData(JSON.parse(event.data))
    setLoading(false)
  }

  useWebSocket({
    url: 'wss://fstream.binance.com/ws/' + symbol + '@ticker',
    onMessage,
  });

  useEffect(() => {
    setInterval(() => {
      fetchBalance()
    }, 2000)
  }, [])

  useEffect(() => {
    setLoading(true)
  }, [symbol])

  return(
    <Layout>
      {
        loading ? <Loading withNavbar={true}/> : null
      }
      <Row>
        <Col xxl={68} lg={50} xs={100} pr="0px" pb="0px">
          <Row>
            <Col xxl={30} xs={100} pr="0px" pb="0px">
              <Symbol symbol={symbol}/>
            </Col>
            <Col xxl={70} xs={100} pr="0px" pb="0px">
              <SymbolInfo data={data}/>
            </Col>
            <Col xs={100} lg={100} dLg="none" pb="0px" pr="0px">
              <ResponsiveSelect showResponsive={showResponsive} setShowResponsive={setShowResponsive} />
            </Col>
            <Col xs={100} pr="0px" pb="0px" dXs={showResponsive == 'chart' ? 'block' : 'none'} dLg="block">
              <Chart symbol={symbol} />
            </Col>
          </Row>
        </Col> 
        <Col xxl={32} xs={100} lg={50} pr="0px" pb="0px">
          <Row>
            <Col xs={100} lg={45} pr="0px" pb="0px" dXs={showResponsive == 'orderBook' || showResponsive == 'trades' ? 'block' : 'none'} dLg="block">
              <Col xs={100} pr="0px" pb="0px" dXs={showResponsive == 'orderBook' ? 'block' : 'none'} dLg="block">
                <OrderBook price={data.c} symbol={symbol}/>
              </Col>
              <Col xs={100} pr="0px" pb="0px" dXs={showResponsive == 'trades' ? 'block' : 'none'} dLg="block">
                <LastTrades symbol={symbol}/>
              </Col>
            </Col>
            <Col lg={55} pr="0px" pb="0px" dXs="none" dLg="block">
              <OrderPanel price={data.c} symbol={symbol} balance={balance} fetchBalance={fetchBalance} fetchPositions={fetchPositions}/>
            </Col>
          </Row>
        </Col>
        <Col xs={100} pr="0px" pb="0px">
          <InfoPanel fetchBalance={fetchBalance} positions={positions} fetchPositions={fetchPositions} symbol={symbol} balance={balance}/>
        </Col>
        <Col xs={100} pr="0px" pb="0px" dLg="none">
          <OrderPanelMobile symbol={symbol} balance={balance} price={data.c} fetchBalance={fetchBalance} fetchPositions={fetchPositions}/>
        </Col>
      </Row>
    </Layout>
  )
}

export default FuturesPage;