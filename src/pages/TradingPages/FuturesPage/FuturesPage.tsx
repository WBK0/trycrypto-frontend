import { useParams } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Row } from "../../../shared/row";
import { Col } from "../../../shared/col";
import Symbol from "./components/symbol/Symbol";
import useWebSocket from "../../../hooks/useWebSocket";
import { useState } from "react";
import SymbolInfo from "./components/symbolInfo/SymbolInfo";
import OrderBook from "./components/orderbook/OrderBook";
import Chart from "./components/chart/Chart";
import LastTrades from "./components/lastTrades/LastTrades";
import OrderPanel from "./components/orderPanel/OrderPanel";
import InfoPanel from "./components/infoPanel/InfoPanel";
import useWallet from "../../../hooks/useWallet";
import api from "../../../services/api";

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
  }

  useWebSocket({
    url: 'wss://fstream.binance.com/ws/' + symbol + '@ticker',
    onMessage
  });

  return(
    <Layout>
      <Row>
        <Col xs={68} pr="0px" pb="0px">
          <Row>
            <Col xs={30} pr="0px" pb="0px">
              <Symbol symbol={symbol}/>
            </Col>
            <Col xs={70} pr="0px" pb="0px">
              <SymbolInfo data={data}/>
            </Col>
            <Col xs={100} pr="0px" pb="0px">
              <Chart symbol={symbol} />
            </Col>
          </Row>
        </Col> 
        <Col xs={32} pr="0px" pb="0px">
          <Row>
            <Col xs={50} pr="0px" pb="0px">
              <OrderBook price={data.c} symbol={symbol}/>
              <LastTrades symbol={symbol}/>
            </Col>
            <Col xs={50} pr="0px" pb="0px">
              <OrderPanel price={data.c} symbol={symbol} balance={balance} fetchBalance={fetchBalance} fetchPositions={fetchPositions}/>
            </Col>
          </Row>
        </Col>
        <Col xs={100} pr="0px" pb="0px">
          <InfoPanel fetchBalance={fetchBalance} positions={positions} fetchPositions={fetchPositions}/>
        </Col>
      </Row>
    </Layout>
  )
}

export default FuturesPage;