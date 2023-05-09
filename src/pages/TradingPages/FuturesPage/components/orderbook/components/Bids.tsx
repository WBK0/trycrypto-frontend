import { useEffect, useState } from "react";
import { BidsWrapper, Item } from "../orderBook.styles";

interface IBids{
  bids: Record<string, number>,
  bidsView: number,
  tick: {
    floor: number, 
    fixed: number
  },
  setBidsMax: (value: number) => void;
  getBackgroundColor: (sumAsks: number, type: string) => string
}


interface Temp {
  [key: string]: number;
}

const Bids: React.FC<IBids> = ({ bids, bidsView, tick, setBidsMax, getBackgroundColor }) => {
  const [bidsFilter, setBidsFilter] = useState<Record<string, number>>({})

  useEffect(() => {
    let temp: Temp = {}
    for (let klucz in bids) {
      let zaokraglonaWartosc = (Math.floor(parseFloat(klucz) * tick.floor) / tick.floor).toFixed(tick.fixed);
      let wartosc = parseFloat(bids[klucz].toString());
      
      if (temp[zaokraglonaWartosc]) {
        temp[zaokraglonaWartosc] += wartosc;
      } else {
        temp[zaokraglonaWartosc] = wartosc;
      } 
    }

    if (Object.keys(temp).length < bidsView) {
      let maxKey = Math.max(...Object.keys(temp).map(parseFloat));
      for (let i = 1; i <= 10; i++) {
        let newKey = (maxKey + i * 10).toFixed(tick.fixed);
        if (!temp[newKey]) {
          temp[newKey] = 0;
        }
      }
    }

    setBidsFilter(temp)
  }, [bids, tick])

  let sumBids = 0;
  let bidsMax = 0;
  Object.keys(bidsFilter).sort((a, b) => Number(b) - Number(a)).slice(0, bidsView).forEach(key => {
    bidsMax = bidsMax += Number(bidsFilter[key]);
  });
  setBidsMax(bidsMax)

  return(
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
  )
}

export default Bids;