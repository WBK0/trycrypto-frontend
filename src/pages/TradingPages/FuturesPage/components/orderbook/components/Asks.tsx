import { useEffect, useState } from "react";
import { AsksWrapper, Item } from "../orderBook.styles";

interface IAsks{
  asks: Record<string, number>,
  asksView: number,
  tick: {
    floor: number, 
    fixed: number
  },
  setAsksMax: (value: number) => void;
  getBackgroundColor: (sumAsks: number, type: string) => string
}

interface Temp {
  [key: string]: number;
}


const Asks: React.FC<IAsks> = ({ asks, asksView, tick, setAsksMax, getBackgroundColor }) => {
  const [asksFilter, setAsksFilter] = useState<Record<string, number>>({})

  useEffect(() => {
    let temp: Temp = {}
    for (let klucz in asks) {
      let zaokraglonaWartosc = (Math.floor(parseFloat(klucz) * tick.floor) / tick.floor).toFixed(tick.fixed);
      let wartosc = parseFloat(asks[klucz].toString());
      
      if (temp[zaokraglonaWartosc]) {
        temp[zaokraglonaWartosc] += wartosc;
      } else {
        temp[zaokraglonaWartosc] = wartosc;
      } 
    }

    if (Object.keys(temp).length < asksView) {
      let maxKey = Math.max(...Object.keys(temp).map(parseFloat));
      for (let i = 1; i <= asksView; i++) {
        let newKey = (maxKey + i / tick.floor).toFixed(tick.fixed);
        if (!temp[newKey]) {
          temp[newKey] = 0;
        }
      }
    }
    let asksMax = 0;
    Object.keys(asksFilter).sort((a, b) => Number(a) - Number(b)).slice(0, asksView).forEach(key => {
      asksMax = asksMax += Number(asksFilter[key]);
    });
    setAsksMax(asksMax)
    setAsksFilter(temp)
  }, [asks, tick])
  
  let sumAsks = 0;
  useEffect(() => {
    
  }, [])

  return(
    <AsksWrapper>
      {Object.keys(asksFilter).sort((a, b) => Number(a) - Number(b)).slice(0, asksView).map((key) => {
        sumAsks += Number(asksFilter[key]);
        return(
          <Item color={getBackgroundColor(sumAsks, 'ask')} key={key}>
            <span>{key} </span>
            <span>{asksFilter[key].toFixed(3)}</span>
          </Item>
        )
      })}
    </AsksWrapper>
  )
}

export default Asks;