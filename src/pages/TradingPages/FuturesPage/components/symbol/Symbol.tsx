import { useEffect, useState } from "react";
import { Change, CurrenciesWrapper, DataWrapper, Name, Price, Wrapper } from "./symbol.styles";
import getData from "../../../../../components/Markets/services/getData";
import { MarketData } from "../../../../../components/Markets/interfaces/interfaces";

interface ISymbol{
  symbol?: string;
}

const Symbol: React.FC<ISymbol> = ({ symbol }) => {
  const [data, setData] = useState<MarketData[] | []>([]);

  useEffect(() => {
    const fetchData = async (market : string) => {
      const data = await getData(market);
      setData(prevData => {
        const updatedData = data.map((item: {lastPrice: string}, index) => ({
          ...item,
          color: item.lastPrice > prevData[index]?.lastPrice ? 'rgb(7, 119, 3)' :  item.lastPrice < prevData[index]?.lastPrice ? 'rgb(119, 3, 3)' : prevData[index]?.color || 'rgb(200, 200, 200)',
        }));
        return updatedData as MarketData[];
      });
    };

    fetchData('futures');
    // Setting up an interval to fetch data
    const interval = setInterval(() => fetchData('futures'), 6000);

    // Clearing the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return(
    <>
      <Wrapper>
        {symbol?.replace('usdt', '/usdt').toUpperCase()}
        <CurrenciesWrapper>
          {data.map((item) => {
            return(
              <DataWrapper>
                <Name>
                  {item.pair}
                </Name>
                <Change>
                  {Number(item.percentChange).toFixed(2)}%
                </Change>
                <Price>
                  {Number(item.lastPrice).toFixed(4)}
                </Price>
              </DataWrapper>
            )
          })}
        </CurrenciesWrapper>
      </Wrapper>
      
    </>
   
  )
}

export default Symbol;