import { useState } from "react";
import { Close, ModalContent, ModalWrapper } from "../../../../../shared/modal.styles";
import { Header, Input, InputLabel, UpdateButton } from "./modal.styles";
import api from "../../../../../services/api";
import { toast } from "react-toastify";
import { IFuturesPositions } from "../TableFuturesPositions";

// Update Modal interface
interface IUpdateModal{
  onClose: () => void;
  modalItem: IFuturesPositions;
  pairPrice: number,
  fetchPositions: () => void;
}

// UpdateModal component - renders the update modal
const UpdateModal: React.FC<IUpdateModal> = ({ onClose, modalItem, fetchPositions }) => {
  // Initialising the state
  const [takeProfit, setTakeProfit] = useState(modalItem.takeProfit || 0);
  const [stopLoss, setStopLoss] = useState(modalItem.stopLoss || 0);

  // Function to handle change take profit
  const handleChangeTP = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setTakeProfit(e.target.value);
    }
  }
  
  // Function to handle change stop loss
  const handleChangeSL = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setStopLoss(e.target.value);
    }
  }

  // Function to handle submit the update 
  const handleSubmit = async () => {
    try {
      // Make a post request to the api to update the position
      await api.post("/api/derivatives/position/update/" + modalItem.id, {
        takeProfit: Number(takeProfit),
        stopLoss: Number(stopLoss)
      })
      // Show a success toast message
      toast.success('The position has been successfully updated', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      // Fetch the positions and close the modal
      fetchPositions();
      onClose();
    } catch (error) {
      // Show a error toast message
      toast.error('The position cannot be updated, please check the data provided', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      })
    } 
  }

  return(
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
        <Close onClick={onClose}>X</Close>
        <Header>Update {modalItem.pair}</Header>
        <InputLabel>Take Profit</InputLabel>
        <Input value={takeProfit} onChange={handleChangeTP}/>
        <InputLabel>Stop Loss</InputLabel>
        <Input value={stopLoss} onChange={handleChangeSL}/>
        <UpdateButton onClick={handleSubmit}>UPDATE</UpdateButton>
      </ModalContent>      
    </ModalWrapper>
  );
}

export default UpdateModal;