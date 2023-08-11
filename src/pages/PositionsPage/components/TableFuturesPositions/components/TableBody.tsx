import { useState } from "react";
import { Actions, CloseButton, Pnl, PnlText, SubSwitch, TBody, Td, Tr, UpdateButton } from "../../tableSpotOrders.styles";
import { IFuturesPositions } from "../TableFuturesPositions";
import SubTable from "./SubTable";
import React from "react";

// TableBody interface
interface ITableBody{
  futuresPositions: IFuturesPositions[];
  openUpdateModal: (item: IFuturesPositions) => void;
  openCloseModal: (item: IFuturesPositions) => void;
  prices: {
    [pair: string]: {
      lastPrice: number;
    };
  };
}

// TableBody component - renders the table body
const TableBody : React.FC<ITableBody> = ({ futuresPositions, openUpdateModal, openCloseModal, prices }) => {
  // Initialising the state
  const [showSubTable, setShowSubTable] = useState(0);

    // Function to handle showing the sub table 
    const handleShow = (id: number) => {
      if(id == showSubTable){
        setShowSubTable(0)
      }else{
        setShowSubTable(id)
      }
    }
  
  return(
    <TBody>
      {futuresPositions.map((item) => {
        return(
        <React.Fragment key={item.id}>
          <Tr>
            <SubSwitch onClick={() => handleShow(item.id)} width="30px">{showSubTable == item.id ? '-' : '+'}</SubSwitch>
            <Td width="60px" color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Td>
            <Td width="100px">{item.pair}</Td>
            <Td width="140px">{item.quantity} {item.pair.replace("USDT", "")}</Td>
            <Td width="160px">{Number(item.purchasePrice).toFixed(4)} USDT</Td>
            <Td width="150px">{Number(prices[item.pair.toUpperCase()]?.lastPrice).toFixed(4)} USDT</Td>
            <Td width="100px">
              <Pnl color={item.purchasePrice <= prices[item.pair.toUpperCase()]?.lastPrice ? item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)' : item.type == 'SHORT' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>
                <PnlText>{item.type == 'LONG' ? ((prices[item.pair.toUpperCase()]?.lastPrice - item.purchasePrice) * item.leverage * item.quantity).toFixed(2) : ((item.purchasePrice - prices[item.pair.toUpperCase()]?.lastPrice) * item.leverage * item.quantity).toFixed(2)} </PnlText>
                <PnlText>{item.type == 'LONG' ? ((prices[item.pair.toUpperCase()]?.lastPrice / item.purchasePrice * 100 - 100) * item.leverage).toFixed(2) : -((prices[item.pair.toUpperCase()]?.lastPrice / item.purchasePrice * 100 - 100) * item.leverage ).toFixed(2)}%</PnlText>
              </Pnl>
            </Td>
            <Actions width="170px">
              <UpdateButton onClick={() => openUpdateModal(item)}>
                Update
              </UpdateButton>
              <CloseButton onClick={() => openCloseModal(item)}>
                Close
              </CloseButton>
            </Actions>
          </Tr>
          {showSubTable == item.id // If the sub table is to be shown
          && 
            <SubTable 
              item={item}
            />
          }
          </React.Fragment>
        )
        })}
    </TBody>
  )
}

export default TableBody;