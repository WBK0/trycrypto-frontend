import { useState } from 'react';
import { AsksWrapper, BidsWrapper, BookWrapper, InfoBar, Item, PriceInfo, SettingsBar, Wrapper } from './orderBook.styles';
import useWebSocket from '../../../../../hooks/useWebSocket';

interface IOrderBook{
  symbol: string | undefined;
  data: {
    c: number;
  }
}

const OrderBook: React.FC<IOrderBook> = ({ symbol, data }) => {
  const [asksView, setAsksView] = useState(10);
  const [bidsView, setBidsView] = useState(10);

  const handleChangeView = (asks: number, bids: number) => {
    setAsksView(asks)
    setBidsView(bids)
  }

  const [orderBook, setOrderBook] = useState({
    asks: [],
    bids: []
  })

  const onMessage = (event: MessageEvent) => {
    setOrderBook(JSON.parse(event.data)); 
  }
  const onOpen = () => {
    console.log('order open')
  }

  useWebSocket({
    url: 'wss://stream.binance.com/ws/' + symbol + '@depth20', 
    onMessage, 
    onOpen
  })

  function getBackgroundColor(amount: number, maxAmount: number, type: string ) {
    const percentage = amount / maxAmount;
    if(type == 'ask'){
      return `linear-gradient(to left, #770303 ${Number(percentage * 115).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }else{
      return `linear-gradient(to left, #077703 ${Number(percentage * 115).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }
   
  }
  
  const maxAmountAsk = Math.max(...orderBook?.asks.map((ask) => ask[1]));
  const maxAmountBid = Math.max(...orderBook?.bids.map((bid) => bid[1]));
  
  return(
    <Wrapper>
      <SettingsBar>
        <BookWrapper color='white'>
          <i className='bi bi-book' onClick={() => handleChangeView(10, 10)} />
        </BookWrapper>
        <BookWrapper color='#077703'>
          <i className='bi bi-book-half' onClick={() => handleChangeView(0, 20)} />
        </BookWrapper>
        <BookWrapper color='#770303'>
          <i className='bi bi-book-half' onClick={() => handleChangeView(20, 0)} />
        </BookWrapper>
      </SettingsBar>
      <InfoBar>
        <span>PRICE</span>
        <span>QUANTITY</span>
      </InfoBar>
      <AsksWrapper>
        {orderBook.asks.slice(0, asksView).sort((a: any, b: any) => b[0] - a[0]).map((item: any) => {
          return(
            <Item background={getBackgroundColor(item[1], maxAmountAsk, 'ask')} key={item}>
              <span>{Number(item[0]).toFixed(item[0] <= 15 ? 5 : 2)}</span>
              <span>{Number(item[1]).toFixed(4)}</span>
            </Item>                     
          )
        })}
      </AsksWrapper>
        <PriceInfo>
          {Number(data?.c).toFixed(data?.c <= 15 ? 5 : 2)}$
        </PriceInfo>
      <BidsWrapper>
        {orderBook.bids.slice(0, bidsView).map((item: any) => {
          return(
            <Item background={getBackgroundColor(item[1], maxAmountBid, 'bid')} key={item}>
              <span>{Number(item[0]).toFixed(item[0] <= 15 ? 5 : 2)}</span>
              <span>{Number(item[1]).toFixed(4)}</span>
            </Item>
          )
        })}
      </BidsWrapper>
    </Wrapper>
  )
}

export default OrderBook;