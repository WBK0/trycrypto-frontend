import { useEffect, useState } from "react";
import useWebSocket from "../../../../../hooks/useWebSocket";
import { AsksWrapper, BidsWrapper, BookWrapper, Books, Item, Option, PriceInfo, Select, SettingsBar, Wrapper } from "./orderBook.styles";

interface IOrderBook{
  price: number,
}

const OrderBook: React.FC<IOrderBook> = ({ price }) => {
  const [asksView, setAsksView] = useState(10);
  const [bidsView, setBidsView] = useState(10);
  const [decimalPlaces, setDecimalPlaces] = useState(0.01);
  const [asks, setAsks] = useState<Record<string, number>>({});
  const [bids, setBids] = useState<Record<string, number>>({});
  const [asksFilter, setAsksFilter] = useState<Record<string, number>>({});
  const [bidsFilter, setBidsFilter] = useState<Record<string, number>>({});

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
      // console.log(newState)
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
      // console.log(newState)
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
  Object.keys(asksFilter).sort((a, b) => Number(a) - Number(b)).slice(0, asksView).forEach(key => {
    asksMax = Number(asksMax) + Number(asksFilter[key]);
  });
  let bidsMax = 0;
  Object.keys(bidsFilter).sort((a, b) => Number(b) - Number(a)).slice(0, bidsView).forEach(key => {
    bidsMax = bidsMax + Number(bidsFilter[key]);
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

  let fixed = 2;
  let floor = 100;

  if(decimalPlaces == 0.01){
    fixed = 2;
    floor = 100;
  }else if(decimalPlaces == 0.1){
    fixed = 1;
    floor = 10;
  }else if(decimalPlaces == 1){
    fixed = 0;
    floor = 1;
  }else if(decimalPlaces == 10){
    fixed = 0;
    floor = 0.1;
  }

  console.log(decimalPlaces)

  useEffect(() => {
    let temp = {}
    for (let klucz in asks) {
      let pierwotnaWartosc = parseFloat(klucz);
      let zaokraglonaWartosc = (Math.floor(pierwotnaWartosc * floor) / floor).toFixed(fixed);
      let wartosc = parseFloat(asks[klucz]);
      
      if (temp[zaokraglonaWartosc]) {
        temp[zaokraglonaWartosc] += wartosc;
      } else {
        temp[zaokraglonaWartosc] = wartosc;
      }
      
    }
    setAsksFilter(temp)

    temp = {}
    for (let klucz in bids) {
      let pierwotnaWartosc = parseFloat(klucz);
      let zaokraglonaWartosc = (Math.floor(pierwotnaWartosc * floor) / floor).toFixed(fixed);
      let wartosc = parseFloat(bids[klucz]);
      
      if (temp[zaokraglonaWartosc]) {
        temp[zaokraglonaWartosc] += wartosc;
      } else {
        temp[zaokraglonaWartosc] = wartosc;
      }
      
    }
    setBidsFilter(temp)
  }, [asks, decimalPlaces])
  
  console.log(asksFilter);

  let sumBids = 0;
  let sumAsks = 0;
  return(
    <Wrapper>
      <SettingsBar>
        <Select onChange={(e) => setDecimalPlaces(e.target.value)}>
          <Option value={0.01}>
            0.01
          </Option>
          <Option value={0.1}>
            0.1
          </Option>
          <Option value={1}>
            1
          </Option>
          <Option value={10}>
            10
          </Option>
        </Select>
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
       
      </SettingsBar>
      <AsksWrapper>
        {Object.keys(asksFilter).sort((a, b) => Number(a) - Number(b)).slice(0, asksView).map((key) => {
          sumAsks += Number(asksFilter[key]);
          return(
            <Item background={getBackgroundColor(sumAsks, 'ask')} key={key}>
              <span>{key} </span>
              <span>{asksFilter[key].toFixed(3)}</span>
            </Item>
          )
        })}
      </AsksWrapper>
      <PriceInfo>{price}</PriceInfo>
      <BidsWrapper>
        {Object.keys(bidsFilter).sort((a, b) => Number(b) - Number(a)).slice(0, bidsView).map((key) => {
          sumBids += Number(bidsFilter[key]);
          return(
            <Item background={getBackgroundColor(sumBids, 'bids')} key={key}>
              <span>{key} </span>
              <span>{bidsFilter[key].toFixed(3)}</span>
            </Item>
          )
        })}
      </BidsWrapper>
    </Wrapper>
  )
}

export default OrderBook;