import { useState } from "react";
import { Close, ModalContent, ModalWrapper } from "../../../../../../../shared/modal.styles";
import { CloseButton, Header, Info, InfoPNL, Quantity, RangeInput } from "./modal.styles";
import { IPositions } from "../../../../FuturesPage";
import api from "../../../../../../../services/api";
import { toast } from "react-toastify";

// Close Modal interface
interface ICloseModal{
  onClose: () => void;
  fetchPositions: () => void;
  modalItem: IPositions;
  pairPrice: {
    [x: string]: number;
  };
  fetchBalance: () => void;
}

// CloseModal component - renders the close modal
const CloseModal: React.FC<ICloseModal> = ({ onClose, fetchPositions, modalItem, pairPrice, fetchBalance }) => {
  // Initialising the state
  const [toSold, setToSold] = useState(0);

  const handleCloseModal = () => {
    
  }

  // Function to handle the change in the range input
  const handleChange = (e : {target: {value: string}}) => {
    setToSold(Number(e.target.value))
  }

  // Function to handle closing the position
  const handleClose = async () => {
    try {
      // Make a post request to the api to close the position
      await api.post('/api/derivatives/market/close/' + modalItem.id, {
        quantity: toSold
      })
      // Toast message for success closing the position
      toast.success(`${toSold}/${modalItem.quantity} of this position has been successfully closed`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      // Fetch the positions, balance and close the modal
      fetchPositions();
      onClose();
      fetchBalance();
    } catch (error) {
      // Show a error toast message and log the error
      toast.error('The position cannot be closed for some unknown reason', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      })
      console.log(error)
    } 
  };

  return(
    <ModalWrapper>
      <ModalContent onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
        <Close onClick={onClose}>X</Close>
        <Header>Close position</Header>
        <Quantity>{toSold}/{modalItem.quantity}</Quantity>
        <RangeInput type="range" min={0} max={modalItem.quantity} step={0.1} onChange={handleChange} value={toSold}/>
        <Info>Your predicted PNL from closing this amount of positions will be: 
          <InfoPNL color={modalItem.type == "LONG" ? pairPrice[modalItem.pair] - modalItem.purchasePrice >= 0 ? 'green' : 'red' : modalItem.purchasePrice - pairPrice[modalItem.pair] >= 0 ? 'green' : 'red'}> {(modalItem.type == "LONG" 
          ? toSold * (pairPrice[modalItem.pair] - modalItem.purchasePrice) * modalItem.leverage 
          : toSold * (modalItem.purchasePrice - pairPrice[modalItem.pair]) * modalItem.leverage).toFixed(2)} USDT</InfoPNL>
        </Info>
        <CloseButton onClick={handleClose}>Close</CloseButton>
      </ModalContent>
      
    </ModalWrapper>
  );
}

export default CloseModal;