import { useEffect, useState } from "react";
import getData from "../../../../components/Markets/services/getData";
import { Change, ChangeIcon, ChangeText, Content, CryptoName, Header, Icon, ItemWrapper, Price, Wrapper } from "./topMovers.styles";
import { MarketData } from "../../../../components/Markets/interfaces/interfaces";

const TopMovers = () => {
  const [data, setData] = useState<MarketData[]>([])

  const fetchData = async () => {
    const result = await getData('spot')
    setData(result)
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(data)

  return(
    <Wrapper>
      <Header>Top movers</Header>
      <Content>
        {data.sort((a, b) => Number(a.percentChange) - Number(b.percentChange)).slice(0, 5).map((item) => {
          return(
          <ItemWrapper>
            <Icon src={`https://api.trycrypto.pl/icon/${item.pair.toLowerCase().replace('usdt', '')}`}></Icon>
            <CryptoName>{item.pair.toUpperCase().replace('USDT', '')}</CryptoName>
            <Price>{Number(item.lastPrice).toFixed(Number(item.lastPrice) >= 15 ? 2 : 4)}$</Price>
            <Change isGrowing={Number(item.percentChange) > 0}>
              <ChangeIcon className={`bi bi-arrow-${Number(item.percentChange) > 0 ? 'up' : 'down'}-right`}></ChangeIcon>
              <ChangeText>{Number(item.percentChange).toFixed(2)}%</ChangeText>
            </Change>
          </ItemWrapper>
          )
        })}
      </Content>
    </Wrapper>
  )
}

export default TopMovers;