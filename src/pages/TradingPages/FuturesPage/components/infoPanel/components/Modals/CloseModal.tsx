import { useState } from "react";
import { Close, ModalContent, ModalWrapper } from "../../../../../../../shared/modal.styles";
import { CloseButton, Info, InfoPNL, Quantity, RangeInput } from "./modal.styles";
import { IPositions } from "../../InfoPanel";

interface ICloseModal{
  onClose: () => void;
  onSubmit: (toSold: number) => void;
  modalItem: IPositions;
  pairPrice: {
    [x: string]: number;
  }
}

const CloseModal: React.FC<ICloseModal> = ({ onClose, onSubmit, modalItem, pairPrice }) => {
  const [toSold, setToSold] = useState(0)
  console.log(modalItem);

  const handleChange = (e : {target: {value: string}}) => {
    setToSold(Number(e.target.value))
  }

  return(
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
        <Close onClick={onClose}>X</Close>
        <Quantity>{toSold}/{modalItem.quantity}</Quantity>
        <RangeInput type="range" min={0} max={modalItem.quantity} step={0.1} onChange={handleChange} value={toSold}/>
        <Info>Your predicted PNL from closing this amount of positions will be: 
          <InfoPNL color={modalItem.type == "LONG" ? pairPrice[modalItem.pair] - modalItem.purchasePrice >= 0 ? 'green' : 'red' : modalItem.purchasePrice - pairPrice[modalItem.pair] >= 0 ? 'green' : 'red'}> {(modalItem.type == "LONG" 
          ? toSold * (pairPrice[modalItem.pair] - modalItem.purchasePrice) * modalItem.leverage 
          : toSold * (modalItem.purchasePrice - pairPrice[modalItem.pair]) * modalItem.leverage).toFixed(2)} USDT</InfoPNL>
        </Info>
        <CloseButton onClick={() => onSubmit(toSold)}>Close</CloseButton>
      </ModalContent>
      
    </ModalWrapper>
  );
}

export default CloseModal;