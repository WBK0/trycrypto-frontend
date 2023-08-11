import { BidsWrapper, Item } from "../../orderBook.styles"

// Bids interface
interface IBids{
  bids: Record<string, number>,
  bidsView: number,
  getBackgroundColor: (sumAsks: number, maxAmount: number, type: string) => string
}

// Bids component - renders the bids component
const Bids : React.FC<IBids> = ({ bids, bidsView, getBackgroundColor }) => {
  // Getting the max amount bid  
  const maxAmountBid = Math.max(...Object.keys(bids).sort((a, b) => Number(b) - Number(a)).slice(0, bidsView).map((bid) => Number(bids[bid])));

  return(
    <BidsWrapper>
      {Object.keys(bids).sort((a, b) => Number(b) - Number(a)).slice(0, bidsView).map((key) => {
        return(
          <Item color={getBackgroundColor(bids[key], maxAmountBid, 'bid')} key={key}>
            <span>{Number(key).toFixed(Number(key) <= 15 ? 5 : 2)}</span>
            <span>{Number(bids[key]).toFixed(4)}</span>
          </Item>
        )
      })}
    </BidsWrapper>
  )
}

export default Bids;