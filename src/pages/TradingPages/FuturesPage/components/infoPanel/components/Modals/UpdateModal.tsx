import { useState } from "react";
import { Close, ModalContent, ModalWrapper } from "../../../../../../../shared/modal.styles";
import { Header, Input, InputLabel, UpdateButton } from "./modal.styles";
import { IPositions } from "../../../../FuturesPage";
import api from "../../../../../../../services/api";
import { toast } from "react-toastify";

// Update Modal interface
interface IUpdateModal{
  onClose: () => void;
  modalItem: IPositions;
  pairPrice: {
    [x: string]: number;
  },
  fetchPositions: () => void;
  fetchBalance: () => void;
}

// UpdateModal component - renders the update modal
const UpdateModal: React.FC<IUpdateModal> = ({ onClose, modalItem, fetchPositions, fetchBalance }) => {
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
      // Make a post request to the api to update the position with the new take profit and stop loss values 
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
      // Fetch the positions, balance and close the modal
      fetchPositions();
      fetchBalance();
      onClose();
    } catch (error) {
      // Show a error toast message and log the error
      toast.error('The position cannot be updated, please check the data provided', {
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
  }

  return(
    <ModalWrapper>
      <ModalContent onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
        <Header>Update TP/SL</Header>
        <Close onClick={onClose}>X</Close>
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