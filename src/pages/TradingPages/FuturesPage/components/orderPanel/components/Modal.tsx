import { useState } from "react";
import { Close, LeverageLevel, ModalContent, ModalWrapper, RangeInput, SaveButton, Warning } from "../orderPanel.styles";

interface IModal{
  onClose: () => void;
  mainLeverage: number;
  onSave: (lever: number) => void;
}

const Modal: React.FC<IModal> = ({ onClose, mainLeverage, onSave }) => {
  const [leverage, setLeverage] = useState(mainLeverage)

  const handleChange = (e: any) => {
    setLeverage(e.target.value)
  }

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>X</Close>
        <LeverageLevel>{leverage}X</LeverageLevel>
        <RangeInput type="range" min={1} max={50} value={leverage} onChange={handleChange}/>
        <Warning><i className="bi bi-exclamation-circle"></i> Choosing high leverage can be dangerous and should be approached with caution as it may result in significant financial losses.</Warning>
        <SaveButton onClick={() => onSave(leverage)}>Save</SaveButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;