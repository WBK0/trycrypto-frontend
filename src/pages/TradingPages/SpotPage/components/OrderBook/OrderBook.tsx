import { useState } from 'react';
import { AsksWrapper, BidsWrapper, BookWrapper, InfoBar, Item, PriceInfo, SettingsBar, Wrapper } from './orderBook.styles';
import useWebSocket from '../../../../../hooks/useWebSocket';
import Settings from './components/Settings/Settings';
import Asks from './components/Asks/Asks';
import Bids from './components/Bids/Bids';

// OrderBook interface
interface IOrderBook{
  symbol: string | undefined;
  data: {
    c: number;
  }
}

// OrderBook component - renders the order book
const OrderBook: React.FC<IOrderBook> = ({ symbol, data }) => {
  // Initialising the state
  const [asksView, setAsksView] = useState(10);
  const [bidsView, setBidsView] = useState(10);
  const [asks, setAsks] = useState<Record<string, number>>({});
  const [bids, setBids] = useState<Record<string, number>>({});

  // Function to handle the change of the view
  const handleChangeView = (asks: number, bids: number) => {
    setAsksView(asks)
    setBidsView(bids)
  }

  // Function to handle the message from the websocket
  const onMessage = (event: MessageEvent) => {
    setAsks(() => {
      const newState : Record<string, number> = {};
      
      JSON.parse(event.data).asks.forEach((newItem: [string, number]) => {
        newState[newItem[0]] = newItem[1]
      });
      return newState;
    });
    // Setting new bids data
    setBids(() => {
      const newState : Record<string, number> = {};

      JSON.parse(event.data).bids.forEach((newItem: [string, number]) => {
        newState[newItem[0]] = newItem[1]
      });
      return newState;
    });
  }

  // Using the useWebSocket hook to get the data from the websocket
  useWebSocket({
    url: 'wss://stream.binance.com/ws/' + symbol + '@depth20', 
    onMessage
  })

  // Function to get the background color of the item
  function getBackgroundColor(amount: number, maxAmount: number, type: string ) {
    const percentage = amount / maxAmount;
    if(type == 'ask'){
      return `linear-gradient(to left, #770303 ${Number(percentage * 115).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }else{
      return `linear-gradient(to left, #077703 ${Number(percentage * 115).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }   
  }
  
  return(
    <Wrapper>
      <Settings handleChangeView={handleChangeView} />
      <InfoBar>
        <span>PRICE</span>
        <span>QUANTITY</span>
      </InfoBar>
      <Asks 
        asksView={asksView}
        asks={asks}
        getBackgroundColor={getBackgroundColor}
      />
      <PriceInfo>
        {Number(data?.c).toFixed(data?.c <= 15 ? 5 : 2)}$
      </PriceInfo>
      <Bids
        bidsView={bidsView}
        bids={bids}
        getBackgroundColor={getBackgroundColor}
      />
    </Wrapper>
  )
}

export default OrderBook;