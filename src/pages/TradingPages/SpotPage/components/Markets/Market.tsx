import { useEffect, useState } from "react";
import { Change, InputWrapper, ItemWrapper, ItemsWrapper, Loupe, MarketWrapper, Pair, Price, SearchBar, SpotLink } from "./market.styles";
import getData from "../../../../../components/Markets/services/getData";
import { MarketData } from "../../../../MarketsPage/components/HighlitedTokens/interfaces/marketData";

const Market = () => {
  const [search, setSearch] = useState('');
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

    fetchData('spot');
    // Setting up an interval to fetch data
    const interval = setInterval(() => fetchData('spot'), 6000);

    // Clearing the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  
  // console.log(data)
  return(
    <MarketWrapper>
      <InputWrapper>
        <Loupe>
          <i className="bi bi-search"></i>
        </Loupe>
        <SearchBar placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </InputWrapper>
      
      <ItemsWrapper>
        {data.filter(obj => obj.pair.includes(search.toUpperCase())).map((item) => {
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