import { useState } from "react";
import { IPositions } from "../InfoPanel";
import { CloseButton, InputTd, Pnl, PnlText, TBody, Td, Tr, Type } from "../infoPanel.styles";
import { Close } from "../../orderPanel/orderPanel.styles";
import CloseModal from "./CloseModal";

interface ITableBody{
  positions: IPositions[],
  pairPrice: {
    [x: string]: number;
  }
}

const TableBody : React.FC<ITableBody> = ({ positions, pairPrice}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({})

  const handleShowModal = (item) => {
    setModalItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return(
    <TBody>
      {positions.map((item) => {
        return(
          <Tr>
            <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3);'}>{item.type}</Type>
            <Td>{item.pair}</Td>
            <Td>{item.leverage}</Td>
            <Td>{item.quantity}</Td>
            <Td>{item.purchasePrice}</Td>
            <Td>{pairPrice[item.pair]}</Td>
            <Pnl>
              <PnlText color={item.purchasePrice <= pairPrice[item.pair] ? item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)' : item.type == 'SHORT' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type == 'LONG' ? ((pairPrice[item.pair] - item.purchasePrice) * item.leverage * item.quantity).toFixed(2) : ((item.purchasePrice - pairPrice[item.pair]) * item.leverage * item.quantity).toFixed(2)} </PnlText>
              <PnlText color={item.purchasePrice <= pairPrice[item.pair] ? item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)' : item.type == 'SHORT' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type == 'LONG' ? ((pairPrice[item.pair] / item.purchasePrice * 100 - 100) * item.leverage).toFixed(2) : -((pairPrice[item.pair] / item.purchasePrice * 100 - 100) * item.leverage ).toFixed(2)}%</PnlText>
            </Pnl>
            <Td>{item.takeProfit || 0}</Td>
            <Td>{item.stopLoss || 0}</Td>
            <Td>{item.liquidationPrice.toFixed(2)}</Td>
            <Td>
              <CloseButton onClick={() => handleShowModal(item)}>CLOSE</CloseButton>
            </Td>
          </Tr>
        )
      })}   
      {showModal && (
        <CloseModal onClose={handleCloseModal} onSubmit={handleClose} modalItem={modalItem} pairPrice={pairPrice}/>
      )}
    </TBody>
  )
}

export default TableBody;