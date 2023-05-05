import { useParams } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Row } from "../../../shared/row";
import { Col } from "../../../shared/col";
import Symbol from "./components/symbol/Symbol";
import useWebSocket from "../../../hooks/useWebSocket";
import { useState } from "react";
import SymbolInfo from "./components/symbolInfo/SymbolInfo";

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
  const { symbol } = useParams()

  const onMessage = (event: MessageEvent) => {
    console.log(JSON.parse(event.data))
    setData(JSON.parse(event.data))
  }

  useWebSocket({
    url: 'wss://fstream.binance.com/ws/' + symbol + '@ticker',
    onMessage
  });

  return(
    <Layout>
      <Row>
        <Col xs={16} pr="0px" pb="0px">
          <Symbol symbol={symbol}/>
        </Col>
        <Col xs={49}>
          <SymbolInfo data={data}/>
        </Col>
      </Row>
    </Layout>
  )
}

export default FuturesPage;