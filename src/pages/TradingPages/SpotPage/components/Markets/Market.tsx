import { useEffect, useState } from "react";
import { Change, InputWrapper, ItemWrapper, ItemsWrapper, Loupe, MarketWrapper, Pair, Price, SearchBar, SpotLink } from "./market.styles";
import { MarketData } from "../../../../MarketsPage/components/HighlitedTokens/interfaces/marketData";
import useMarketData from "../../../../../hooks/useMarketData";

// Market component - the main component of the spot page
const Market = () => {
  // Initializing state variables
  const [search, setSearch] = useState('');
  const [displayData, setDisplayData] = useState<MarketData[]>([]);
  // Fetching data using useMarketData hook
  const { getData } = useMarketData('spot');

  // Fetching data and updating the displayData state variable 
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('spot');
      console.log(data)
      setDisplayData(prevData => {
        const updatedData = data.map((item: {lastPrice: string}, index : number) => ({
          ...item,
          color: item.lastPrice > prevData[index]?.lastPrice ? 'rgb(7, 119, 3)' :  item.lastPrice < prevData[index]?.lastPrice ? 'rgb(119, 3, 3)' : prevData[index]?.color || 'rgb(200, 200, 200)',
        }));
        return updatedData as MarketData[];
      });
    };

    fetchData();
    // Setting up an interval to fetch data
    const interval = setInterval(() => fetchData(), 6000);

    // Clearing the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  
  return(
    <MarketWrapper>
      <InputWrapper>
        <Loupe>
          <i className="bi bi-search"></i>
        </Loupe>
        <SearchBar placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </InputWrapper>
      
      <ItemsWrapper>
        {displayData.filter(obj => obj.pair.includes(search.toUpperCase())).map((item) => {
          return(
            <SpotLink key={item.pair} to={`/market/spot/${item.pair.toLowerCase()}`}>
              <ItemWrapper>
                <Pair>
                  {item.pair.replace('USDT', '/USDT')}
                </Pair>
                <Price color={item.color}>
                  {Number(item.lastPrice).toFixed(Number(item.lastPrice) <= 15 ? 4 : 2)}$
                </Price>
                <Change color={item.percentChange}>
                  {Number(item.percentChange).toFixed(2)}%
                </Change>
              </ItemWrapper>
            </SpotLink>
          )
        })}
      </ItemsWrapper>
    </MarketWrapper>
  )
}

export default Market;