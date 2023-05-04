import { useEffect, useRef } from "react";
import { Row } from "../../../../../shared/row";
import { ChartWrapper } from "./chart.styles";

interface IChart {
  symbol: string | undefined;
}

const Chart: React.FC<IChart> = ({ symbol }) => {
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
        locale: 'pl',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: false,
        show_popup_button: true,
        popup_width: "1000",
        popup_height: "650",
        container_id: 'tradingview_33c1c',
        
      };
      const widget = new (window as any).TradingView.widget(widgetOptions);
    }
  
  }
}, [ symbol ]);

  return(
    <Row>
      <ChartWrapper>
        <div className='tradingview-widget-container' style={{height: '100%'}}>
          <div id='tradingview_33c1c' style={{height: '100%'}}/>
          <div className="tradingview-widget-copyright">
            <a href={`https://www.tradingview.com/symbols/${symbol}`} rel="noopener" target="_blank">{symbol?.toUpperCase()} chart</a> by TradingView
          </div>
        </div>
      </ChartWrapper>
    </Row>
  )
}

export default Chart;