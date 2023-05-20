import { useEffect, useState } from "react";
import { SelectBar, SelectButton, Wrapper } from "./infoPanel.styles";
import { IPositions } from "../../FuturesPage";
import Positions from "./components/Positions/Positions";
import TransactionHistoryView from "./components/TransactionHistory/TransactionHistory";

interface IInfoPanel{
  fetchBalance: () => void
  positions: IPositions[];
  fetchPositions: () => void;
}

const InfoPanel: React.FC<IInfoPanel> = ({ fetchBalance, positions, fetchPositions }) => {
  const [view, setView] = useState(0);
  
  useEffect(() => {
    fetchPositions()
  }, [])

  return(
    <Wrapper>
      <SelectBar>
        <SelectButton active={view == 0 ? true : false} onClick={() => setView(0)}>Positions</SelectButton>
        <SelectButton active={view == 1 ? true : false} onClick ={() => setView(1)}>Transaction History</SelectButton>
      </SelectBar>
      {(() => {
          switch (view) {
            case 0:
              return(
                <Positions 
                  positions={positions} 
                  fetchBalance={fetchBalance} 
                  fetchPositions={fetchPositions}
                />
              )
            case 1:
              return(
                <TransactionHistoryView 
                  
                />
              )
            default:
              console.warn(`Unexpected step value: ${view}`);
              return null
          }
        })()}      
      
    </Wrapper>
  )
}

export default InfoPanel;