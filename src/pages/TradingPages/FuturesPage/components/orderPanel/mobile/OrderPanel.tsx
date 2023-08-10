import { useState } from "react";
import { Button, Wrapper } from "./orderPanel.styles";
import Modal from "./Modal";
import IWallet from "../../../../../../interfaces/Wallet.interface";

// OrderPanelMobile interface
interface IOrderPanelMobile{
  symbol?: string;
  balance?: IWallet;
  price: number;
  fetchBalance: () => void;
  fetchPositions: () => void;
}

// OrderPanelMobile component - renders the order panel for mobile devices
const OrderPanelMobile: React.FC<IOrderPanelMobile> = ({ symbol, balance, price, fetchBalance, fetchPositions }) => {
  // Initialize state variables
  const [showModal, setShowModal] = useState(false) 
  const [type, setType] = useState<'buy' | 'sell'>("buy")

  // Function to close the modal 
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to show the modal
  const handleShowModal = (type: 'buy' | 'sell') => {
    setType(type)
    setShowModal(true);
  };

  return(
    <>
    <Wrapper>
      <Button color="green" onClick={() => handleShowModal('buy')}>
        BUY/LONG
      </Button>
      <Button color="red" onClick={() => handleShowModal('sell')}>
        SELL/SHORT
      </Button>
    </Wrapper>
    
      {showModal && <Modal onClose={handleCloseModal} symbol={symbol} balance={balance} pairPrice={price} type={type} fetchBalance={fetchBalance} fetchPositions={fetchPositions}/>}
    </>


  )
}

export default OrderPanelMobile;