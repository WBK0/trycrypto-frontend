import { useState } from "react";
import useWebSocket from "../../../../../hooks/useWebSocket";
import { AsksWrapper, BidsWrapper, BookWrapper, Item, PriceInfo, SettingsBar, Wrapper } from "./orderBook.styles";

interface IOrderBook{
  price: number,
}

const OrderBook: React.FC<IOrderBook> = ({ price }) => {
  const [asksView, setAsksView] = useState(10);
  const [bidsView, setBidsView] = useState(10);
  const [asks, setAsks] = useState<Record<string, number>>({});
  const [bids, setBids] = useState<Record<string, number>>({});
  
  const handleChangeView = (asks: number, bids: number) => {
    setAsksView(asks)
    setBidsView(bids)
  }
 

  const onMessage = (event : any) => {
    setAsks(prevState => {
      const newState = {...prevState};
      for (let key in newState) {
        if(Number(key) < price){
          delete newState[key];
        }
      }
      console.log(newState)
      JSON.parse(event.data).a.forEach((newItem: [string, number]) => {
        newState[newItem[0]] = newItem[1]
        if(newItem[1] == 0){
          delete newState[newItem[0]];
        }
      });
      return newState;
    });
    setBids(prevState => {
      const newState = {...prevState};
      for (let key in newState) {
        if(Number(key) > price){
          delete newState[key];
        }
      }
      console.log(newState)
      JSON.parse(event.data).b.forEach((newItem: [string, number]) => {
        newState[newItem[0]] = newItem[1]
        if(newItem[1] == 0){
          delete newState[newItem[0]];
        }
      });
      return newState;
    });
  };

  useWebSocket({url: 'wss://fstream.binance.com/ws/ethusdt@depth@500ms', onMessage})

  let asksMax = 0;
  Object.keys(asks).sort((a, b) => Number(a) - Number(b)).slice(0, asksView).forEach(key => {
    asksMax = asksMax + Number(asks[key]);
  });
  let bidsMax = 0;
  Object.keys(bids).sort((a, b) => Number(b) - Number(a)).slice(0, bidsView).forEach(key => {
    bidsMax = bidsMax + Number(bids[key]);
  });

  let maxAmount = asksMax >= bidsMax ? asksMax : bidsMax;

  function getBackgroundColor(amount: number, type: string ) {
    const percentage = amount / maxAmount;
    if(type == 'ask'){
      return `linear-gradient(to left, #770303 ${Number(percentage * 100).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }else{
      return `linear-gradient(to left, #077703 ${Number(percentage * 100).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }
   
  } 

  console.log(bidsMax)
  let sumBids = 0;
  let sumAsks = 0;
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
      <AsksWrapper>
        {Object.keys(asks).sort((a, b) => Number(a) - Number(b)).slice(0, asksView).map((key) => {
          sumAsks += Number(asks[key]);
          return(
            <Item background={getBackgroundColor(sumAsks, 'ask')} key={key}>
              <span>{key} </span>
              <span>{asks[key]}</span>
            </Item>
          )
        })}
      </AsksWrapper>
      <PriceInfo>{price}</PriceInfo>
      <BidsWrapper>
        {Object.keys(bids).sort((a, b) => Number(b) - Number(a)).slice(0, bidsView).map((key) => {
          sumBids += Number(bids[key]);
          return(
            <Item background={getBackgroundColor(sumBids, 'bids')} key={key}>
              <span>{key} </span>
              <span>{bids[key]}</span>
            </Item>
          )
        })}
      </BidsWrapper>
    </Wrapper>
  )
}

export default OrderBook;