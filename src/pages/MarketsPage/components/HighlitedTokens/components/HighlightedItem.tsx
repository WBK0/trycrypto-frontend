import { MarketData } from '../interfaces/marketData';
import { ChangeWrapper, IconWrapper, PriceWrapper, Wrapper } from '../highlited.styles';

// Define the interface
interface IHighlightedToken{
  item: MarketData;
}

// This component renders a single highlighted token item
const HighlitedItem : React.FC<IHighlightedToken> = ({ item }) => {
  return(
    <Wrapper>
      <IconWrapper>
        <img src={"https://api.trycrypto.pl/icon/" + item.pair.replace(/usdt/gi, "").toLowerCase()} alt="Crypto icon"/> 
          {item.pair.replace(/usdt/gi, "")}
      </IconWrapper>
      <PriceWrapper>
        {Number(item.lastPrice).toFixed(2)}
      </PriceWrapper>
      <ChangeWrapper>
        {Number(item.percentChange).toFixed(2) + "%"}
      </ChangeWrapper>
    </Wrapper>
  )
}

export default HighlitedItem;