import { Change, ChangeIcon, ChangeText, Content, CryptoName, Header, Icon, ItemWrapper, Price, Wrapper } from "./ourSelection.styles";
import { MarketData } from "../../../MarketsPage/components/HighlitedTokens/interfaces/marketData";

interface IOurSelection{
  data: MarketData[]
}

// OurSelection component - renders the 10 most volume tokens
const OurSelection : React.FC<IOurSelection> = ({ data }) => {
  return(
    <Wrapper>
      <Header>Our selection</Header>
      <Content>
        {/* Map 10 most volume tokens from the data array and render them */}
        {data.sort((a, b) => Number(b.volume) - Number(a.volume)).slice(0, 10).map((item) => { 
          return(
          <ItemWrapper>
            {/* Render the icon */}
            <Icon src={`https://api.trycrypto.pl/icon/${item.pair.toLowerCase().replace('usdt', '')}`}></Icon> 
            <CryptoName>{item.pair.toUpperCase().replace('USDT', '')}</CryptoName>
            {/* Render the price with 2 or 4 decimal places depending on the price */}
            <Price>
              {Number(item.lastPrice).toFixed(Number(item.lastPrice) >= 15 ? 2 : 4)}$ 
            </Price>
            {/* Render the arrow icon depending on the change */}
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