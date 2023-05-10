import { useEffect, useState } from "react";
import { Flex, Price, Quantity, Time, TradeWrapper, Wrapper } from "./lastTrades.styles";
import useWebSocket from "../../../../../hooks/useWebSocket";

interface IData {
  E: number;
  s: string;
  p: string;
  q: string;
}

interface ILastTrades {
  symbol: string | undefined;
}

const LastTrades : React.FC<ILastTrades> = ({ symbol }) => {
  const [data, setData] = useState<IData[]>([])
  
  const onMessage = (event: MessageEvent) => {
    setData(prevData => {
      const newData = [JSON.parse(event.data), ...prevData,];
      return newData.slice(0, 150);
    });
  }

  useWebSocket({url: 'wss://stream.binance.com/ws/' + symbol + '@aggTrade', onMessage})

  useEffect(() => {
    setData([])
  }, [symbol])

  return(
    <Wrapper>
      <Flex>
        <TradeWrapper>
          <Price>Price</Price>
          <Quantity>{symbol?.toString().toUpperCase().replace("USDT", "")}</Quantity>
          <Time>Time</Time>
        </TradeWrapper>
        {data.map((item: any) => {
          const date = new Date(item.T);
          return(
            <TradeWrapper key={item.a}>
              <Price color={item.m == true ? '#770303' : '#077703'}>{Number(item.p).toFixed((item.p <= 15 ? 4 : 2))}</Price>
              <Quantity>{Number(item.q).toFixed((item.p <= 15 ? 3 : 4))}</Quantity>
              <Time>{date.getHours() + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + ':'+ (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())}</Time>
            </TradeWrapper>
          )
        })}
      </Flex>
    </Wrapper>
  )
}

export default LastTrades;