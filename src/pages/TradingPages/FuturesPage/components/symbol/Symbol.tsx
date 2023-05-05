import { Wrapper } from "./symbol.styles";

interface ISymbol{
  symbol?: string;
}

const Symbol: React.FC<ISymbol> = ({ symbol }) => {
  return(
    <Wrapper>
      {symbol?.replace('usdt', '/usdt').toUpperCase()}
    </Wrapper>
  )
}

export default Symbol;