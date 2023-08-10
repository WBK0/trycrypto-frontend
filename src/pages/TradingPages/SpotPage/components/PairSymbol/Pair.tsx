import { Wrapper } from './pair.styles';

// Pair interface
interface IPair{
  symbol: string | undefined;
}

// Pair component - renders the pair symbol
const Pair: React.FC<IPair> = ({ symbol }) => {
  return(
    <Wrapper>
      {symbol?.toUpperCase().replace("USDT", "/USDT")}
    </Wrapper>
  )
}

export default Pair;