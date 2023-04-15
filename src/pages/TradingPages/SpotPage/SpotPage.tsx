import { useParams } from "react-router-dom";
import TradingLayout from "../../../layout/TradingLayout/TradingLayout";
import styles from './spotPage.module.css';
import { useEffect, useRef, useState } from "react";

interface TradingView {
  widget: (options: any) => any;
}

declare global {
  interface Window {
    TradingView: TradingView;
  }
}

const SpotPage: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const [data, setData] = useState<any>({
    c: null,
p: null,
  });
  useEffect(() => {
    const newSocket = new WebSocket('wss://stream.binance.com/ws/' + symbol + '@ticker');

    newSocket.addEventListener('open', () => {
      console.log('Connected to WebSocket');
    });

    newSocket.addEventListener('message', (event) => {
      setData(JSON.parse(event.data));
    });

    newSocket.addEventListener('close', () => {
      console.log('Disconnected from WebSocket');

      // Optionally, try to reconnect to the WebSocket after a short delay
      setTimeout(() => {
        setSocket(null);
      }, 5000);
    });

    setSocket(newSocket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);


  const {symbol} = useParams()
  console.log(data.c);
  let tvScriptLoadingPromise: Promise<Event>;
const onLoadScriptRef = useRef<(() => void) | null>(null);

useEffect(() => {
  onLoadScriptRef.current = createWidget;

  if (!tvScriptLoadingPromise) {
    tvScriptLoadingPromise = new Promise<Event>((resolve) => {
      const script = document.createElement('script');
      script.id = 'tradingview-widget-loading-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.type = 'text/javascript';
      script.onload = resolve;

      document.head.appendChild(script);
    });
  }

  tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

  return () => {
    onLoadScriptRef.current = null;
  };

  function createWidget() {
    if (document.getElementById('tradingview_33c1c') && typeof window.TradingView === 'object') {
      const widgetOptions = {
        autosize: true,
        symbol: 'BINANCE:' + symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: false,
        container_id: 'tradingview_33c1c',
        
      };
      const widget = new (window as any).TradingView.widget(widgetOptions);
      // dodanie atrybutu SameSite do cookies, które przesyłane są przez TradingView
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookieParts = cookies[i].split('=');
      const cookieName = cookieParts[0];
      const cookieValue = cookieParts[1];
      document.cookie = `${cookieName}=${cookieValue}; SameSite=Lax`;
    }
    }
  
  }
}, []);

  return(
    <TradingLayout>
      <div className="container">
        <div className="row">
          <div className='col-lg-2 col-12 ps-0 pe-0 h-100'>
            <div className={`${styles.symbol} d-flex align-items-center justify-content-center`}>
              {symbol?.toUpperCase().replace("USDT", "/USDT")}
            </div>
          </div>
          <div className="col-lg-8 col-12">
            <div className="row">
              <div className={styles.symbolInfo}>
                <div className="row align-items-center h-100">
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>PRICE</p>
                    <p className={`mb-0 ${styles.info}`}>{Number(data.c).toFixed(2)}$</p>
                  </div>
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>24H CHANGE</p>
                    <p className={`mb-0 ${styles.info}`}>{Number(data.p).toFixed(2)}$ {Number(data.P).toFixed(2)}%</p>
                  </div>
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>24H HIGH</p>
                    <p className={`mb-0 ${styles.info}`}>{Number(data.h).toFixed(2)}$</p>
                  </div>
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>24H LOW</p>
                    <p className={`mb-0 ${styles.info}`}>{Number(data.l).toFixed(2)}$</p>
                  </div>
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>OPEN PRICE</p>
                    <p className={`mb-0 ${styles.info}`}>{Number(data.o).toFixed(2)}$</p>
                  </div>
                  <div className="d-flex flex-column align-items-start col-4 col-lg-2">
                    <p className={`mb-0 ${styles.header}`}>24H VOLUME</p>
                    <p className={`mb-0 ${styles.info}`}>{Number(data.q * 0.000001).toFixed(2)}M</p>
                  </div>
                  
                </div>
                
              </div>
              <div className="row me-0 ms-0 pe-0 ps-0">
                <div className={styles.chartContainer}>
                  <div className='tradingview-widget-container h-100'>
                    <div id='tradingview_33c1c' className="h-100"/>
                    <div className="tradingview-widget-copyright">
                      <a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span className="blue-text">{symbol?.toUpperCase()} chart</span></a> by TradingView
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <div className="col-2">

          </div>
        </div>
      </div>
    </TradingLayout>
  )
}

export default SpotPage;