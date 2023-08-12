import { useContext, useState } from "react";
import { LeverageButton, LeverageWrapper, LoginLink, LoginText, LoginWrapper, OrderTypeLink, OrderTypeWrapper, Wrapper } from "./orderPanel.styles";
import Modal from "./components/modal/Modal";
import IWallet from "../../../../../interfaces/Wallet.interface";
import AuthContext from "../../../../../contexts/AuthContext";
import MarketOrderPanel from "./components/market/MarketOrderPanel";
import LimitOrderPanel from "./components/limit/LimitOrderPanel";
import useLocalStorage from "../../../../../hooks/useLocalStorage";

// OrderPanel interface
interface IOrderPanel{
  price: number;
  symbol: string;
  balance?: IWallet;
  fetchBalance: () => void;
  fetchPositions: () => void;
}

// OrderPanel component - renders the order panel
const OrderPanel: React.FC<IOrderPanel> = ({ price, symbol, balance, fetchBalance, fetchPositions }) => {
  // Initialising the state
  const [orderType, setOrderType] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Get the leverage from the local storage or set it to 10 if it doesn't exist
  const [leverage, setLeverage] = useLocalStorage(symbol, 10);

  // Get the isLoggedIn state from the AuthContext
  const { isLoggedIn } = useContext(AuthContext)

  // Function for showing the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Function for closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function for saving the modal
  const handleSave = (lever: number) => {
    setShowModal(false);
    setLeverage(lever)
  };

  return(
    <Wrapper>{
      isLoggedIn ? 
      <> 
        <LeverageWrapper>
          <LeverageButton 
            onClick={handleShowModal}
            data-tooltip-id="tooltip" 
            data-tooltip-content="Set leverage for your order"
          >
            {leverage}X
          </LeverageButton>
        </LeverageWrapper>
        {showModal && (
          <Modal onClose={handleCloseModal} symbol={symbol} onSave={handleSave}/>
        )}
        <OrderTypeWrapper>
          <OrderTypeLink 
            onClick={() => setOrderType(0)} 
            active={orderType == 0 ? true : false}
            data-tooltip-id="tooltip" 
            data-tooltip-content="Market transaction is executed at the current market price" 
          >
            Market
          </OrderTypeLink>
          <OrderTypeLink 
            onClick={() => setOrderType(1)} 
            active={orderType == 1 ? true : false}
            data-tooltip-id="tooltip" 
            data-tooltip-content="The transaction limit is executed at a price set by the client." 
          >
            Limit
          </OrderTypeLink>
        </OrderTypeWrapper>
        {(() => { // Switch statement for rendering the order panel based on the order type
          switch (orderType) {
            case 0:
              return(
                <MarketOrderPanel 
                  price={price} 
                  symbol={symbol} 
                  balance={balance} 
                  fetchBalance={fetchBalance} 
                  fetchPositions={fetchPositions} 
                  leverage={leverage} 
                />
              )
            case 1:
              return(
                <LimitOrderPanel 
                  pairPrice={price} 
                  symbol={symbol} 
                  balance={balance} 
                  fetchBalance={fetchBalance} 
                  fetchPositions={fetchPositions} 
                  leverage={leverage} 
                />
              )
            default:
              console.warn(`Unexpected step value: ${orderType}`);
              return null
          }
        })()}      
      </>
      : 
      <LoginWrapper>
        <LoginText>Please <LoginLink to='/login'>login</LoginLink> or <LoginLink to='/register'>register</LoginLink> to make order</LoginText>
      </LoginWrapper>
      }
      
    </Wrapper>
  )
}

export default OrderPanel;