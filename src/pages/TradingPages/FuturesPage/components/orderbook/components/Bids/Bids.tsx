import { useEffect, useState } from "react";
import { BidsWrapper, Item } from "../../orderBook.styles";

// Bids interface
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

// Temp interface
interface Temp {
  [key: string]: number;
}

// Bids component - renders the bids component
const Bids: React.FC<IBids> = ({ bids, bidsView, tick, setBidsMax, getBackgroundColor }) => {
  // Initialising the state
  const [bidsFilter, setBidsFilter] = useState<Record<string, number>>({})

  // Use effect to filter the bids data
  useEffect(() => {
    // Declaring the temp variable
    let temp: Temp = {}
    // Looping through the bids data and filtering it based on the tick size
    for (let klucz in bids) {
      let zaokraglonaWartosc = (Math.floor(parseFloat(klucz) * tick.floor) / tick.floor).toFixed(tick.fixed);
      let wartosc = parseFloat(bids[klucz].toString());
      
      if (temp[zaokraglonaWartosc]) {
        temp[zaokraglonaWartosc] += wartosc;
      } else {
        temp[zaokraglonaWartosc] = wartosc;
      } 
    }

    // Looping through the bids data and adding the missing values
    if (Object.keys(temp).length < bidsView) {
      let minKey = Math.min(...Object.keys(temp).map(parseFloat));
      for (let i = 1; i <= bidsView; i++) {
        let newKey = (minKey - i / tick.floor).toFixed(tick.fixed);
        if (!temp[newKey] && Number(newKey) >= 0) {
          temp[newKey] = 0;
        }
      }
    }
    // Setting the bids max value
    let bidsMax = 0;
    Object.keys(bidsFilter).sort((a, b) => Number(b) - Number(a)).slice(0, bidsView).forEach(key => {
      bidsMax = bidsMax += Number(bidsFilter[key]);
    });
    setBidsMax(bidsMax)
    setBidsFilter(temp)
  }, [bids, tick])

  // Initialising the sumBids variable
  let sumBids = 0;

  return(
    <BidsWrapper>
      {Object.keys(bidsFilter).sort((a, b) => Number(b) - Number(a)).slice(0, bidsView).map((key) => {
        sumBids += Number(bidsFilter[key]);
        return(
          <Item color={getBackgroundColor(sumBids, 'bids')} key={key}>
            <span>{key} </span>
            <span>{bidsFilter[key].toFixed(3)}</span>
          </Item>
        )
      })}
    </BidsWrapper>
  )
}

export default Bids;