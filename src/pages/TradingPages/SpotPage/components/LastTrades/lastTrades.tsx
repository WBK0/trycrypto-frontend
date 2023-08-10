import { useEffect, useState } from "react";
import { Flex, Price, Quantity, Time, TradeWrapper, Wrapper } from "./lastTrades.styles";
import useWebSocket from "../../../../../hooks/useWebSocket";

// Data interface
interface IData {
  E: number;
  s: string;
  p: string;
  q: string;
}

// LastTrades interface
interface ILastTrades {
  symbol: string | undefined;
}

// LastTrades component - renders the last trades
const LastTrades : React.FC<ILastTrades> = ({ symbol }) => {
  // Initialising the state
  const [data, setData] = useState<IData[]>([])
  
  // Function to handle the message from the websocket
  const onMessage = (event: MessageEvent) => {
    setData(prevData => {
      const newData = [JSON.parse(event.data), ...prevData,];
      return newData.slice(0, 150);
    });
  }

  // Using the useWebSocket hook to get the data from the websocket
  useWebSocket({url: 'wss://stream.binance.com/ws/' + symbol + '@aggTrade', onMessage})

  // Function to clear the data when the symbol changes
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