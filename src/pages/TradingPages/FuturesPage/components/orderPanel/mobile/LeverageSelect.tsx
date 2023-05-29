import { useState } from "react";
import { LeverageLevel, RangeInput, SaveButton, Warning } from "../orderPanel.styles";

interface ILeverageSelect{
  mainLeverage: number;
  onSave: (value: number) => void;
}

const LeverageSelect: React.FC<ILeverageSelect> = ({mainLeverage, onSave}) => {
  const [leverage, setLeverage] = useState(mainLeverage)

  const handleChange = (e: any) => {
    setLeverage(e.target.value)
  }

  return(
    <>
      <LeverageLevel>
        {leverage}X
      </LeverageLevel>
      <RangeInput type="range" min={1} max={50} value={leverage} onChange={handleChange}/>
      <Warning>
        <i className="bi bi-exclamation-circle"></i> Choosing high leverage can be dangerous and should be approached with caution as it may result in significant financial losses.</Warning>
      <SaveButton onClick={() => onSave(leverage)}>Save</SaveButton>
    </>
  )
}

export default LeverageSelect;