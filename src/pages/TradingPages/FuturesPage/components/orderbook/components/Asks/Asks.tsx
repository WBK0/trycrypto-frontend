import { useEffect, useState } from "react";
import { AsksWrapper, Item } from "../../orderBook.styles";

// Asks interface
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

// Temp interface
interface Temp {
  [key: string]: number;
}

// Asks component - renders the asks component
const Asks: React.FC<IAsks> = ({ asks, asksView, tick, setAsksMax, getBackgroundColor }) => {
  // Initialising the state
  const [asksFilter, setAsksFilter] = useState<Record<string, number>>({});

  // Use effect to filter the asks data 
  useEffect(() => {
    // Declaring the temp variable
    let temp: Temp = {}
    // Looping through the asks data and filtering it based on the tick size
    for (let klucz in asks) {
      let zaokraglonaWartosc = (Math.floor(parseFloat(klucz) * tick.floor) / tick.floor).toFixed(tick.fixed);
      let wartosc = parseFloat(asks[klucz].toString());

      // Adding the asks data to the temp variable 
      if (temp[zaokraglonaWartosc]) {
        temp[zaokraglonaWartosc] += wartosc;
      } else {
        temp[zaokraglonaWartosc] = wartosc;
      } 
    }

    // Looping through the asks data and adding the missing values
    if (Object.keys(temp).length < asksView) {
      let maxKey = Math.max(...Object.keys(temp).map(parseFloat));
      for (let i = 1; i <= asksView; i++) {
        let newKey = (maxKey + i / tick.floor).toFixed(tick.fixed);
        if (!temp[newKey]) {
          temp[newKey] = 0;
        }
      }
    }
    // Setting the asks max value
    let asksMax = 0;
    Object.keys(asksFilter).sort((a, b) => Number(a) - Number(b)).slice(0, asksView).forEach(key => {
      asksMax = asksMax += Number(asksFilter[key]);
    });
    setAsksMax(asksMax)
    setAsksFilter(temp)
  }, [asks, tick])
  
  // Initialising the sumAsks variable
  let sumAsks = 0;

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