import { useState } from "react";
import { IPositions } from "../../../../../../FuturesPage";
import { Buttons, CloseButton, Pnl, PnlText, TBody, Td, Tr, Type, UpdateButton } from "../../../../infoPanel.styles";
import CloseModal from "../../../Modals/CloseModal";
import UpdateModal from "../../../Modals/UpdateModal";

// TableBody interface
interface ITableBody{
  positions: IPositions[],
  pairPrice: {
    [x: string]: number;
  },
  fetchPositions: () => void;
  fetchBalance: () => void;
  symbol?: string;
}

// TableBody component - renders the table body
const TableBody : React.FC<ITableBody> = ({ positions, pairPrice, fetchPositions, fetchBalance, symbol }) => {
  // Initialising the state
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [modalItem, setModalItem] = useState<IPositions>()

  // Function to handle showing the close modal
  const handleShowCloseModal = (item: IPositions) => {
    setModalItem(item);
    setShowCloseModal(true);
  };

  // Function to handle showing the update modal
  const handleShowUpdateModal = (item: IPositions) => {
    setModalItem(item);
    setShowUpdateModal(true);
  };

  // Function to handle closing the close modal
  const handleCloseModal = () => {
    setShowCloseModal(false);
  };

  // Function to handle closing the update modal
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  return(
    <TBody>
      {symbol && positions.filter((item) => item.pair.includes(symbol?.toUpperCase())).sort((a, b) => a.id - b.id).slice().reverse().map((item) => {
        return(
          <Tr>
            <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3);'}>{item.type}</Type>
            <Td>{item.pair}</Td>
            <Td>{item.leverage}</Td>
            <Td>{item.quantity}</Td>
            <Td>{item.purchasePrice}</Td>
            <Td>{pairPrice[item.pair]}</Td>
            <Pnl color={item.purchasePrice <= pairPrice[item.pair] ? item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)' : item.type == 'SHORT' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>
              <PnlText>{item.type == 'LONG' ? ((pairPrice[item.pair] - item.purchasePrice) * item.leverage * item.quantity).toFixed(2) : ((item.purchasePrice - pairPrice[item.pair]) * item.leverage * item.quantity).toFixed(2)} </PnlText>
              <PnlText>{item.type == 'LONG' ? ((pairPrice[item.pair] / item.purchasePrice * 100 - 100) * item.leverage).toFixed(2) : -((pairPrice[item.pair] / item.purchasePrice * 100 - 100) * item.leverage ).toFixed(2)}%</PnlText>
            </Pnl>
            <Td>{item.takeProfit || 0}</Td>
            <Td>{item.stopLoss || 0}</Td>
            <Td>{item.liquidationPrice.toFixed(4)}</Td>
            <Buttons>
              <UpdateButton onClick={() => handleShowUpdateModal(item)}>UPDATE</UpdateButton>
              <CloseButton onClick={() => handleShowCloseModal(item)}>CLOSE</CloseButton>
            </Buttons>
          </Tr>
        )
      })}   
      {showCloseModal && modalItem && (
        <CloseModal onClose={handleCloseModal} fetchPositions={fetchPositions} modalItem={modalItem} pairPrice={pairPrice} fetchBalance={fetchBalance}/>
      )}
      {showUpdateModal && modalItem && (
        <UpdateModal onClose={handleCloseUpdateModal} modalItem={modalItem} pairPrice={pairPrice} fetchPositions={fetchPositions} fetchBalance={fetchBalance}/>
      )}
    </TBody>
  )
}

export default TableBody;