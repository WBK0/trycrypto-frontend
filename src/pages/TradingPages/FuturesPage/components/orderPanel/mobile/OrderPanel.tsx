import { useState } from "react";
import { Button, Wrapper } from "./orderPanel.styles";
import Modal from "./Modal";
import IWallet from "../../../../../../interfaces/Wallet.interface";

interface IOrderPanelMobile{
  symbol?: string;
  balance?: IWallet;
  price: number;
  fetchBalance: () => void;
  fetchPositions: () => void;
}

const OrderPanelMobile: React.FC<IOrderPanelMobile> = ({ symbol, balance, price, fetchBalance, fetchPositions }) => {
  const [showModal, setShowModal] = useState(false) 
  const [type, setType] = useState<'buy' | 'sell'>("buy")

  const handleCloseModal = () => {
    setShowModal(false);
  };

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