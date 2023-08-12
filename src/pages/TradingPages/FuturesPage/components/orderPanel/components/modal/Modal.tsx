import { LeverageLevel, RangeInput, SaveButton, Warning } from "../../orderPanel.styles";
import { Close, ModalContent, ModalWrapper } from "../../../../../../../shared/modal.styles";
import useLocalStorage from "../../../../../../../hooks/useLocalStorage";

// Modal interface
interface IModal{
  onClose: () => void;
  symbol: string;
  onSave: (lever: number) => void;
}

// Modal component - renders the modal
const Modal: React.FC<IModal> = ({ onClose, symbol, onSave }) => {
  // Get the leverage from the local storage or set it to 10 if it doesn't exist
  const [leverage, setLeverage] = useLocalStorage(symbol, 10);

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