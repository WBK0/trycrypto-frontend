import { AsksWrapper, BidsWrapper, InfoBar, Item, PriceInfo } from "../../orderBook.styles";

// OrdersView interface
interface IOrdesView{
  orderBook: {
    asks: string[];
    bids: string[];
  };
  asksView: number;
  bidsView: number;
  data: {
    c: number;
  }
}

// The OrdersView component - renders the asks and bids
const OrdersView : React.FC<IOrdesView> = ({orderBook, asksView, bidsView, data }) => {
  // Function to get the background color of the item
  function getBackgroundColor(amount: number, maxAmount: number, type: string ) {
    const percentage = amount / maxAmount;
    if(type == 'ask'){
      return `linear-gradient(to left, #770303 ${Number(percentage * 115).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }else{
      return `linear-gradient(to left, #077703 ${Number(percentage * 115).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }   
  }
  
  // Getting the max amount of the asks and bids
  const maxAmountAsk = Math.max(...orderBook?.asks.map((ask) => Number(ask[1])));
  const maxAmountBid = Math.max(...orderBook?.bids.map((bid) => Number(bid[1])));

  return(
    <>
      <InfoBar>
        <span>PRICE</span>
        <span>QUANTITY</span>
      </InfoBar>
      <AsksWrapper>
        {orderBook.asks.slice(0, asksView).sort((a: any, b: any) => b[0] - a[0]).map((item: any) => {
          return(
            <Item background={getBackgroundColor(item[1], maxAmountAsk, 'ask')} key={item}>
              <span>{Number(item[0]).toFixed(item[0] <= 15 ? 5 : 2)}</span>
              <span>{Number(item[1]).toFixed(4)}</span>
            </Item>                     
          )
        })}
      </AsksWrapper>
        <PriceInfo>
          {Number(data?.c).toFixed(data?.c <= 15 ? 5 : 2)}$
        </PriceInfo>
      <BidsWrapper>
        {orderBook.bids.slice(0, bidsView).map((item: any) => {
          return(
            <Item background={getBackgroundColor(item[1], maxAmountBid, 'bid')} key={item}>
              <span>{Number(item[0]).toFixed(item[0] <= 15 ? 5 : 2)}</span>
              <span>{Number(item[1]).toFixed(4)}</span>
            </Item>
          )
        })}
      </BidsWrapper>
    </>
  )
}

export default OrdersView;