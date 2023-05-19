import { useState } from "react";
import { Close, ModalContent, ModalWrapper } from "../../../../../../../shared/modal.styles";
import { Input, InputLabel, UpdateButton } from "./modal.styles";
import { IPositions } from "../../../../FuturesPage";
import api from "../../../../../../../services/api";
import { toast } from "react-toastify";

interface IUpdateModal{
  onClose: () => void;
  modalItem: IPositions;
  pairPrice: {
    [x: string]: number;
  },
  fetchPositions: () => void;
  fetchBalance: () => void;
}

const UpdateModal: React.FC<IUpdateModal> = ({ onClose, modalItem, fetchPositions, fetchBalance }) => {
  const [takeProfit, setTakeProfit] = useState(modalItem.takeProfit || 0);
  const [stopLoss, setStopLoss] = useState(modalItem.stopLoss || 0);

  const handleChangeTP = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setTakeProfit(e.target.value);
    }
  }
  const handleChangeSL = (e : any) => {
    if(Number(e.target.value) || Number(e.target.value) == 0){
      setStopLoss(e.target.value);
    }
  }
  const handleSubmit = async () => {
    try {
      await api.post("/api/derivatives/position/update/" + modalItem.id, {
        takeProfit: Number(takeProfit),
        stopLoss: Number(stopLoss)
      },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }})
      toast.success('The position has been successfully updated', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        });
      fetchPositions();
      fetchBalance();
      onClose();
    } catch (error) {
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