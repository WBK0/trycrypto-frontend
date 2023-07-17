import { useContext, useState } from "react";
import { LeverageButton, LeverageWrapper, LoginLink, LoginText, LoginWrapper, OrderTypeLink, OrderTypeWrapper, Wrapper } from "./orderPanel.styles";
import Modal from "./components/Modal";
import IWallet from "../../../../../interfaces/Wallet.interface";
import AuthContext from "../../../../../contexts/AuthContext";
import MarketOrderPanel from "./market/MarketOrderPanel";
import LimitOrderPanel from "./limit/LimitOrderPanel";

interface IOrderPanel{
  price: number;
  symbol?: string;
  balance?: IWallet;
  fetchBalance: () => void;
  fetchPositions: () => void;
}

const OrderPanel: React.FC<IOrderPanel> = ({ price, symbol, balance, fetchBalance, fetchPositions }) => {
  const [orderType, setOrderType] = useState(0);
  const [leverage, setLeverage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useContext(AuthContext)

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = (lever: number) => {
    setShowModal(false);
    setLeverage(lever)
  };

  return(
    <Wrapper>{
      isLoggedIn ? 
      <> 
        <LeverageWrapper>
          <LeverageButton onClick={handleShowModal}>{leverage}X</LeverageButton>
        </LeverageWrapper>
        {showModal && (
          <Modal onClose={handleCloseModal} mainLeverage={leverage} onSave={handleSave}/>
        )}
        <OrderTypeWrapper>
          <OrderTypeLink onClick={() => setOrderType(0)} active={orderType == 0 ? true : false}>Market</OrderTypeLink>
          <OrderTypeLink onClick={() => setOrderType(1)} active={orderType == 1 ? true : false}>Limit</OrderTypeLink>
        </OrderTypeWrapper>
        {(() => {
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