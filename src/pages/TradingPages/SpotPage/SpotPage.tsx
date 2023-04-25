import { useParams } from "react-router-dom";
import TradingLayout from "../../../layout/TradingLayout/TradingLayout";
import styles from './spotPage.module.css';
import { useEffect, useRef, useState } from "react";
import Chart from "../../../components/TradingComponents/SpotComponents/Chart";
import Pair from "../../../components/TradingComponents/SpotComponents/Pair";
import PairInfo from "../../../components/TradingComponents/SpotComponents/PairInfo";
import Loading from './../../../components/Loading/Loading';
import { Container } from "../../../shared/container";
import { Row } from "../../../shared/row";
import { Col } from "../../../shared/col";

interface TradingView {
  widget: (options: any) => any;
}

declare global {
  interface Window {
    TradingView: TradingView;
  }
}

const SpotPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<any>(null);
  const { symbol } = useParams()

  const [data, setData] = useState({
    c: 0,
    p: 0,
    P: 0,
    h: 0,
    l: 0,
    o: 0,
    q: 0
  });
  const [orderBook, setOrderBook] = useState({
    asks: [],
    bids: []
  })
  
  useEffect(() => {
    const newSocket = new WebSocket('wss://stream.binance.com/ws/' + symbol + '@ticker' + '/' + symbol + '@depth10');

    newSocket.addEventListener('message', (event) => {
      if(JSON.parse(event.data).e == '24hrTicker'){
        setData(JSON.parse(event.data));
      }else{
        setOrderBook(JSON.parse(event.data));
      }
      
      setLoading(false)
    });

    return () => {
      if (socket) {
        newSocket.close();
      }
    };
  }, []);
  
console.log(orderBook)
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
    <>
    {
      loading ?
      <Loading />
      :
      <TradingLayout>
        <Container>
          <Row>
            <Col xs={20} pr="0px" pb="0px">
              <Pair symbol={symbol} />
            </Col>
            <Col xs={65} pr="0px" pb="0px">
              <PairInfo data={data} />
            </Col>
          </Row>
          <Row>
            <Col xs={20} pr="0px" pb="0px">
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
              </Col>
              <Col xs={65} pr="0px" pb="0px">
                <Chart symbol={symbol}/>
              </Col>
          </Row>
              <Row>
                <Col ml='20%' xs={65} pr='0px' pb="0px">
                  <Row>
                  <Col xs={50}>
                    <p className={styles.money}>
                      Dostępne: 9434.32USDT
                    </p>
                    <div className="input-group mb-3">
                      <span className={`input-group-text ${styles.inputGroup}`}>Cena</span>
                      <input type="text" className={`form-control ${styles.input}`} aria-label="Amount (to the nearest dollar)" value="Market" disabled />
                      <span className={`input-group-text ${styles.inputGroup}`}>USDT</span>
                    </div>
                    <div className="input-group mb-3">
                      <span className={`input-group-text ${styles.inputGroup}`}>Ilość</span>
                      <input type="text" className={`form-control ${styles.input}`} aria-label="Amount (to the nearest dollar)" />
                      <span className={`input-group-text ${styles.inputGroup}`}>USDT</span>
                    </div>
                    <div className="input-group mb-3">
                      <span className={`input-group-text ${styles.inputGroup}`}>Suma</span>
                      <input type="text" className={`form-control ${styles.input}`} aria-label="Amount (to the nearest dollar)" />
                      <span className={`input-group-text ${styles.inputGroup}`}>{symbol?.toUpperCase()}</span>
                    </div>
                    <input type="range" className="form-range mb-3" min="0" max="100" id="customRange2"></input>
                    <button type="button" className="btn btn-success mb-4 w-100">Kup {symbol?.toUpperCase()}</button>
                  </Col>
                  <Col xs={50}>
                    <p className={styles.money}>
                      Dostępne: 9434.32USDT
                    </p>
                    <div className="input-group mb-3">
                      <span className={`input-group-text ${styles.inputGroup}`}>Cena</span>
                      <input type="text" className={`form-control ${styles.input}`} aria-label="Amount (to the nearest dollar)" value="Market" disabled />
                      <span className={`input-group-text ${styles.inputGroup}`}>USDT</span>
                    </div>
                    <div className="input-group mb-3">
                      <span className={`input-group-text ${styles.inputGroup}`}>Ilość</span>
                      <input type="text" className={`form-control ${styles.input}`} aria-label="Amount (to the nearest dollar)" />
                      <span className={`input-group-text ${styles.inputGroup}`}>USDT</span>
                    </div>
                    <div className="input-group mb-3">
                      <span className={`input-group-text ${styles.inputGroup}`}>Suma</span>
                      <input type="text" className={`form-control ${styles.input}`} aria-label="Amount (to the nearest dollar)" />
                      <span className={`input-group-text ${styles.inputGroup}`}>{symbol?.toUpperCase()}</span>
                    </div>
                    <input type="range" className="form-range mb-3" min="0" max="100" id="customRange2"></input>
                    <button type="button" className="btn btn-success mb-4 w-100">Kup {symbol?.toUpperCase()}</button>
                  </Col>
                  </Row>
                </Col>
              </Row>
            
            
             
                
                
              
            <div className="col-2">

            </div>
          
        </Container>
      </TradingLayout>
      }
    </>
  )
}

export default SpotPage;