import { useEffect, useState } from "react";
import useWebSocket from "../../../../../hooks/useWebSocket";
import { BookWrapper, Books, Option, PriceInfo, Select, SettingsBar, Wrapper } from "./orderBook.styles";
import Asks from "./components/Asks/Asks";
import Bids from "./components/Bids/Bids";
import SelectTick from "./components/SelectTick/SelectTick";
import Settings from "./components/Settings/Settings";

// OrderBook interface
interface IOrderBook{
  price: number,
  symbol?: string,
  loading: boolean
}

// OrderBook component - renders the order book component 
const OrderBook: React.FC<IOrderBook> = ({ price, symbol, loading }) => {
  // Initialising the state
  const [asksView, setAsksView] = useState(10);
  const [bidsView, setBidsView] = useState(10);
  const [tickSize, setTickSize] = useState(0.0001);
  const [asks, setAsks] = useState<Record<string, number>>({});
  const [bids, setBids] = useState<Record<string, number>>({});
  const [asksMax, setAsksMax] = useState(0)
  const [bidsMax, setBidsMax] = useState(0)

  // Use effect to clear the orderbook data on symbol change
  useEffect(() => {
    setAsks({});
    setBids({});
  }, [symbol])

  // Function to handle the change orderbook view
  const handleChangeView = (asks: number, bids: number) => {
    setAsksView(asks)
    setBidsView(bids)
  }

  // Use effect to set the tick size
  useEffect(() => {
    setTickSize(
      price <= 5 ? 0.0001
      : price <= 10 ? 0.001
      : price <= 5000 ? 0.01
      : 0.1
    )
  }, [loading])

  // Function to handle the websocket message 
  const onMessage = (event : any) => {
    // Setting new asks data
    setAsks(prevState => {
      const newState = {...prevState};
      for (let key in newState) {
        if(Number(key) < price){
          delete newState[key];
        }
      }
      
      JSON.parse(event.data).a.forEach((newItem: [string, number]) => {
        newState[newItem[0]] = newItem[1]
        if(newItem[1] == 0){
          delete newState[newItem[0]];
        }
      });
      return newState;
    });
    // Setting new bids data
    setBids(prevState => {
      const newState = {...prevState};
      for (let key in newState) {
        if(Number(key) > price){
          delete newState[key];
        }
      }

      JSON.parse(event.data).b.forEach((newItem: [string, number]) => {
        newState[newItem[0]] = newItem[1]
        if(newItem[1] == 0){
          delete newState[newItem[0]];
        }
      });
      return newState;
    });
  };

  // Use websocket hook to connect to the binance websocket
  useWebSocket({url: `wss://fstream.binance.com/ws/${symbol?.toLowerCase()}@depth@500ms`, onMessage})

  // Getting the max amount of asks and bids
  let maxAmount = asksMax >= bidsMax ? asksMax : bidsMax;

  // Function to get the background color of the orderbook
  function getBackgroundColor(amount: number, type: string ) {
    const percentage = amount / maxAmount;
    if(type == 'ask'){
      return `linear-gradient(to left, #770303 ${Number(percentage * 100).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }else{
      return `linear-gradient(to left, #077703 ${Number(percentage * 100).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }
  }

  // Tick size settings
  const tickSizeSettings: Record<number, { fixed: number; floor: number }> = {
    0.0001: { fixed: 4, floor: 10000 },
    0.001: { fixed: 3, floor: 1000 },
    0.01: { fixed: 2, floor: 100 },
    0.1: { fixed: 1, floor: 10 },
    1: { fixed: 0, floor: 1 },
    10: { fixed: 0, floor: 0.1 },
    100: { fixed: 1, floor: 0.01 },
  };

  // Getting the tick size settings 
  const tick = tickSizeSettings[tickSize] || { fixed: 2, floor: 100 };

  return(
    <Wrapper>
      <Settings 
        tickSize={tickSize}
        setTickSize={setTickSize}
        handleChangeView={handleChangeView}
        price={price}
      />
      <Asks 
        asks={asks} 
        asksView={asksView} 
        tick={tick} 
        setAsksMax={setAsksMax} 
        getBackgroundColor={getBackgroundColor} 
      />
      <PriceInfo>{price}</PriceInfo>
      <Bids 
        bids={bids} 
        bidsView={bidsView} 
        tick={tick} 
        setBidsMax={setBidsMax} 
        getBackgroundColor={getBackgroundColor} 
      />
    </Wrapper>
  )
}

export default OrderBook;