import { Col } from "../../../shared/col";
import { Row } from "../../../shared/row";
import styles from '../../../pages/TradingPages/SpotPage/spotPage.module.css'
import { Balance, InputSymbol, InputText, InputWrapper, MarketPriceInput } from "./styles/orderPanel.styles";

interface IOrderPanel{
  symbol: string;
}

const OrderPanel: React.FC<IOrderPanel> = ({ symbol }) => {
  return(
    <Row>
      <Col xs={50}>
        <Balance>
          Dostępne: 9434.32USDT
        </Balance>
        <InputWrapper>
          <InputText>Cena</InputText>
          <MarketPriceInput value="Market" disabled />
          <InputSymbol>USDT</InputSymbol>
        </InputWrapper>
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
      <Col xs={50} pl="12px" pr='0px'>
        <Balance>
          Dostępne: 9434.32USDT
        </Balance>
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
  )
}

export default OrderPanel;