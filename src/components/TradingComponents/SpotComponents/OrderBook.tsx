import styles from '../../../pages/TradingPages/SpotPage/spotPage.module.css'

const OrderBook = ({orderBook, data}) => {
  function getBackgroundColor(amount, maxAmount, type) {
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
    <div className={styles.orderBook}>
      <div className={styles.orderBookType}>
        <i className={`bi bi-book ${styles.book} cursor-pointer`} style={{color: 'white'}}></i>
        <i className={`bi bi-book-half ${styles.book}`} style={{color: '#077703'}}></i>
        <i className={`bi bi-book-half ${styles.book}`} style={{color: '#770303'}}></i>
      </div>
      <div className={styles.tableInfo}>
        <span>CENA USDT</span>
        <span>ILOŚĆ</span>
      </div>
      <div className={styles.asks}>
        {orderBook.asks.map((item: any) => {
          return(<>
            <div className={styles.orderBookItem} style={{background: getBackgroundColor(item[1], maxAmountAsk, 'ask')}}>
              <span>{Number(item[0]).toFixed(2)}</span>
              <span>{Number(item[1]).toFixed(4)}</span>
            </div>                     
            </>
          )
        })}
      </div>
      <div className={styles.priceInfo}>
        {Number(data.c).toFixed(2)}$
      </div>
      {orderBook.bids.map((item: any) => {
        return(
          <div className={styles.orderBookItem} style={{background: getBackgroundColor(item[1], maxAmountBid, 'bid')}}>
            <span>{Number(item[0]).toFixed(2)}</span>
            <span>{Number(item[1]).toFixed(4)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default OrderBook;