import styles from './spot.module.css'
import { Wrapper } from './styles/pair.styles';

interface IPair{
  symbol: string | undefined;
}

const Pair: React.FC<IPair> = ({ symbol }) => {
  return(
    <Wrapper>
      {symbol?.toUpperCase().replace("USDT", "/USDT")}
    </Wrapper>
  )
}

export default Pair;