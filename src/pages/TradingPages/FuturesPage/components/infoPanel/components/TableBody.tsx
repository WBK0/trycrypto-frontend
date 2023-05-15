import { InputTd, Pnl, PnlText, TBody, Td, Tr, Type } from "../infoPanel.styles";

const TableBody = ({ positions, pairPrice}) => {
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
            <Td><InputTd defaultValue={item.takeProfit || 0}/></Td>
            <Td><InputTd defaultValue={item.stopLoss || 0}/></Td>
            <Td>{item.liquidationPrice.toFixed(2)}</Td>
            <Td><button>close</button></Td>
          </Tr>
        )
        
      })}   
    </TBody>
  )
}

export default TableBody;