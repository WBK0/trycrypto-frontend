import { useEffect, useState } from "react";
import { Change, InputWrapper, ItemWrapper, ItemsWrapper, Loupe, MarketWrapper, Pair, Price, SearchBar } from "./styles/market.styles";
import getData from "../../Markets/services/getData";
import { MarketData } from "../../Markets/interfaces/interfaces";

const Market = () => {

  const [data, setData] = useState<MarketData[] | []>([]);

  useEffect(() => {
    const fetchData = async (market : string) => {
      const data = await getData(market);
      setData(prevData => {
        const updatedData = data.map((item, index) => ({
          ...item,
          prevPrice: prevData[index]?.lastPrice || 0
        }));
        return updatedData;
      });
    };
   
    fetchData('spot');
    // Setting up an interval to fetch data
    const interval = setInterval(() => fetchData('spot'), 6000);

    // Clearing the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  

  return(
    <MarketWrapper>
      <InputWrapper>
        <Loupe>
          <i className="bi bi-search"></i>
        </Loupe>
        <SearchBar placeholder="Search" />
      </InputWrapper>
      
      <ItemsWrapper>
        {data.map((item) => {
          let color;
          if(item.lastPrice > item.prevPrice){
            color = 'green';
          }else if(item.lastPrice < item.prevPrice){
            color = 'red'
          }else{
            color = 'grey'
          }

          return(
            <ItemWrapper>
              <Pair>
                {item.pair.replace('USDT', '/USDT')}
              </Pair>
              <Price color={color}>
                {Number(item.lastPrice).toFixed(Number(item.lastPrice) <= 15 ? 4 : 2)}$
              </Price>
              <Change>
                {Number(item.percentChange).toFixed(2)}%
              </Change>
            </ItemWrapper>
          )
        })}
      </ItemsWrapper>
    </MarketWrapper>
  )
}

export default Market;