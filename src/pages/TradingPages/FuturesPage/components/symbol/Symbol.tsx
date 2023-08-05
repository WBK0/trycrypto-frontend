import { useEffect, useState } from "react";
import { Change, CurrenciesWrapper, DataWrapper, Name, Price, SearchBar, Wrapper } from "./symbol.styles";
import getData from "../../../../../components/Markets/services/getData";
import { MarketData } from "../../../../../components/Markets/interfaces/interfaces";

interface ISymbol{
  symbol?: string;
}

const Symbol: React.FC<ISymbol> = ({ symbol }) => {
  const [data, setData] = useState<MarketData[] | []>([]);
  const [search, setSearch] = useState('');

  const handleSearch = (e: {target: {value: string}}) => {
    setSearch(e.target.value);
  }

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
          <SearchBar onChange={handleSearch}/>
          {data.filter(obj => obj.pair.includes(search.toUpperCase())).map((item) => {
            return(
              <DataWrapper to={`/market/futures/${item.pair.toLowerCase()}`}>
                <Name>
                  {item.pair}
                </Name>
                <Price color={item.color}>
                  {Number(item.lastPrice).toFixed(4)}
                </Price>
                <Change color={Number(item.percentChange) > 0 ? 'rgb(7, 119, 3)' : 'rgb(119, 7, 3)'}>
                  {Number(item.percentChange).toFixed(2)}%
                </Change>
              </DataWrapper>
            )
          })}
        </CurrenciesWrapper>
      </Wrapper>
      
    </>
   
  )
}

export default Symbol;