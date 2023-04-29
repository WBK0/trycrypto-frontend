import { AsksWrapper, BidsWrapper, BookWrapper, InfoBar, Item, PriceInfo, SettingsBar, Wrapper } from './styles/orderBook.styles';

interface IOrderBook{
  orderBook: {
    asks: [], 
    bids: []
  };
  data: {
    c: number,
  }
}

const OrderBook: React.FC<IOrderBook> = ({orderBook, data}) => {
  function getBackgroundColor(amount: number, maxAmount: number, type: string ) {
    const percentage = amount / maxAmount;
    if(type == 'ask'){
      return `linear-gradient(to left, #770303 ${Number(percentage * 115).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }else{
      return `linear-gradient(to left, #077703 ${Number(percentage * 115  ).toFixed(0) + "%"}, transparent ${Number(percentage * 100).toFixed(0) + "%"})`;
    }
   
  }
  
  const maxAmountAsk = Math.max(...orderBook.asks.map((ask) => ask[1]));
  const maxAmountBid = Math.max(...orderBook.bids.map((bid) => bid[1]));
  
  return(
    <Wrapper>
      <SettingsBar>
        <BookWrapper color='white'>
          <i className='bi bi-book' />
        </BookWrapper>
        <BookWrapper color='#077703'>
          <i className='bi bi-book-half' />
        </BookWrapper>
        <BookWrapper color='#770303'>
          <i className='bi bi-book-half' />
        </BookWrapper>
      </SettingsBar>
      <InfoBar>
        <span>CENA USDT</span>
        <span>ILOŚĆ</span>
      </InfoBar>
      <AsksWrapper>
        {orderBook.asks.sort((a: any, b: any) => b[0] - a[0]).map((item: any) => {
          return(<>
            <Item background={getBackgroundColor(item[1], maxAmountAsk, 'ask')}>
              <span>{Number(item[0]).toFixed(item[0] <= 15 ? 4 : 2)}</span>
              <span>{Number(item[1]).toFixed(4)}</span>
            </Item>                     
            </>
          )
        })}
      </AsksWrapper>
      <PriceInfo>
        {Number(data.c).toFixed(2)}$
      </PriceInfo>
      <BidsWrapper>
        {orderBook.bids.map((item: any) => {
          return(
            <Item background={getBackgroundColor(item[1], maxAmountBid, 'bid')}>
              <span>{Number(item[0]).toFixed(item[0] <= 15 ? 4 : 2)}</span>
              <span>{Number(item[1]).toFixed(4)}</span>
            </Item>
          )
        })}
      </BidsWrapper>
    </Wrapper>
  )
}

export default OrderBook;