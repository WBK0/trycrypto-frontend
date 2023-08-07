import { Change, ChangeIcon, ChangeText, Content, CryptoName, Header, Icon, ItemWrapper, Price, Wrapper } from "./ourSelection.styles";
import { MarketData } from "../../../MarketsPage/components/HighlitedTokens/interfaces/marketData";

interface ITopMovers{
  data: MarketData[]
}

const OurSelection : React.FC<ITopMovers> = ({ data }) => {
  return(
    <Wrapper>
      <Header>Our selection</Header>
      <Content>
        {data.sort((a, b) => Number(b.volume) - Number(a.volume)).slice(0, 10).map((item) => {
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

export default OurSelection;