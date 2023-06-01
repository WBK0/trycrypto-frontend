import { useEffect, useState } from "react";
import useWebSocket from "../../../../../hooks/useWebSocket";
import { BookWrapper, Books, Option, PriceInfo, Select, SettingsBar, Wrapper } from "./orderBook.styles";
import Asks from "./components/Asks";
import Bids from "./components/Bids";
import SelectTick from "./components/SelectTick";

interface IOrderBook{
  price: number,
  symbol?: string
}

const OrderBook: React.FC<IOrderBook> = ({ price, symbol }) => {
  const [asksView, setAsksView] = useState(10);
  const [bidsView, setBidsView] = useState(10);
  const [tickSize, setTickSize] = useState(0.0001);
  const [asks, setAsks] = useState<Record<string, number>>({});
  const [bids, setBids] = useState<Record<string, number>>({});
  const [asksMax, setAsksMax] = useState(0)
  const [bidsMax, setBidsMax] = useState(0)

  useEffect(() => {
    setAsks({});
    setBids({});
  }, [symbol])

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

      JSON.parse(event.data).b.forEach((newItem: [string, number]) => {
        newState[newItem[0]] = newItem[1]
        if(newItem[1] == 0){
          delete newState[newItem[0]];
        }
      });
      return newState;
    });
  };

  useWebSocket({url: `wss://fstream.binance.com/ws/${symbol?.toLowerCase()}@depth@500ms`, onMessage})

  let maxAmount = asksMax >= bidsMax ? asksMax : bidsMax;

  function getBackgroundColor(amount: number, type: string ) {
    const percentage = amount / maxAmount;
    if(type == 'ask'){
      return `linear-gradient(to left, #770303 ${Number(percentage * 100).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }else{
      return `linear-gradient(to left, #077703 ${Number(percentage * 100).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }
   
  }

  let tick = {
    fixed: 2,
    floor: 100
  }
  if(tickSize == 0.0001){
    tick.fixed = 4;
    tick.floor = 10000;
  }else if(tickSize == 0.001){
    tick.fixed = 3;
    tick.floor = 1000;
  }else if(tickSize == 0.01){
    tick.fixed = 2;
    tick.floor = 100
  }else if (tickSize == 0.1){
    tick.fixed = 1;
    tick.floor = 10;
  }else if(tickSize == 1){
    tick.fixed = 0;
    tick.floor = 1;
  }else if(tickSize == 10){
    tick.fixed = 0;
    tick.floor = 0.1;
  }
  else if(tickSize == 100){
    tick.fixed = 1;
    tick.floor = 0.01;
  }

  return(
    <Wrapper>
      <SettingsBar>
        
        <Books>
          <BookWrapper color='white'>
            <i className='bi bi-book' onClick={() => handleChangeView(10, 10)} />
          </BookWrapper>
          <BookWrapper color='#077703'>
            <i className='bi bi-book-half' onClick={() => handleChangeView(0, 20)} />
          </BookWrapper>
          <BookWrapper color='#770303'>
            <i className='bi bi-book-half' onClick={() => handleChangeView(20, 0)} />
          </BookWrapper>
        </Books>
      <SelectTick
        price={price}
        setTickSize={setTickSize} 
        tickSize={tickSize}
      />
      </SettingsBar>
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