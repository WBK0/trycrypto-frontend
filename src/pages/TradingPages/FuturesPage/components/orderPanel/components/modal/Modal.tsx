import { useState } from "react";
import { LeverageLevel, RangeInput, SaveButton, Warning } from "../../orderPanel.styles";
import { Close, ModalContent, ModalWrapper } from "../../../../../../../shared/modal.styles";

// Modal interface
interface IModal{
  onClose: () => void;
  mainLeverage: number;
  onSave: (lever: number) => void;
}

// Modal component - renders the modal
const Modal: React.FC<IModal> = ({ onClose, mainLeverage, onSave }) => {
  // Initialising the state
  const [leverage, setLeverage] = useState(mainLeverage)

  // Function for handling the change of the range input
  const handleChange = (e: any) => {
    setLeverage(e.target.value)
  }

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
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