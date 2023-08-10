import { useState } from 'react';
import { AsksWrapper, BidsWrapper, BookWrapper, InfoBar, Item, PriceInfo, SettingsBar, Wrapper } from './orderBook.styles';
import useWebSocket from '../../../../../hooks/useWebSocket';
import Settings from './components/Settings/Settings';
import OrdersView from './components/OrdersView/OrdersView';

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
  const [orderBook, setOrderBook] = useState({
    asks: [],
    bids: []
  })

  // Function to handle the change of the view
  const handleChangeView = (asks: number, bids: number) => {
    setAsksView(asks)
    setBidsView(bids)
  }

  // Function to handle the message from the websocket
  const onMessage = (event: MessageEvent) => {
    setOrderBook(JSON.parse(event.data)); 
  }

  // Using the useWebSocket hook to get the data from the websocket
  useWebSocket({
    url: 'wss://stream.binance.com/ws/' + symbol + '@depth20', 
    onMessage
  })
  
  return(
    <Wrapper>
      <Settings handleChangeView={handleChangeView} />
      <OrdersView 
        orderBook={orderBook}
        asksView={asksView}
        bidsView={bidsView}
        data={data}
      />
    </Wrapper>
  )
}

export default OrderBook;