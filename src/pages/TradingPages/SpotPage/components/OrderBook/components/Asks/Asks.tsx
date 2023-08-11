import { AsksWrapper, Item } from "../../orderBook.styles"

// Asks interface
interface IAsks{
  asks: Record<string, number>,
  asksView: number,
  getBackgroundColor: (sumAsks: number, maxAmount: number, type: string) => string
}

// Asks component - renders the asks
const Asks : React.FC<IAsks> = ({ asks, asksView, getBackgroundColor }) => {
  // Get the max amount of the asks
  const maxAmountAsk = Math.max(...Object.keys(asks).sort((a, b) => Number(a) - Number(b)).slice(0, asksView).map((bid) => Number(asks[bid])));

  return(
    <AsksWrapper>
      {Object.keys(asks).sort((a, b) => Number(a) - Number(b)).slice(0, asksView).map((key) => {
        return(
          <Item color={getBackgroundColor(asks[key], maxAmountAsk, 'ask')} key={key}>
            <span>{Number(key).toFixed(Number(key) <= 15 ? 5 : 2)}</span>
            <span>{Number(asks[key]).toFixed(4)}</span>
          </Item>                     
        )
      })}
    </AsksWrapper>
  )
}

export default Asks;