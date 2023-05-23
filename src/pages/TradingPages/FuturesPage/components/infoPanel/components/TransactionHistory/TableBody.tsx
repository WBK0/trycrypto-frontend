import { Pnl, PnlText, TBody, Td, Tr, Type } from "../../infoPanel.styles";
import { IHistory } from "./TransactionHistory";

interface ITableBody{
  history?: IHistory[]
}

const TableBody: React.FC<ITableBody> = ({ history }) => {
  return(
    <TBody>
      {history && history.map((item) => {
        const date = new Date(item.date).toLocaleString();
        const pnlAmount = Number(item.type == 'LONG' ? (item.quantitySold * item.sellingPrice - item.quantitySold * item.purchasePrice) * item.leverage : (item.quantitySold * item.purchasePrice - item.quantitySold * item.sellingPrice) * item.leverage).toFixed(2)
        const pnlPercent = item.type == 'LONG' ? ((item.sellingPrice / item.purchasePrice * 100 - 100) * item.leverage).toFixed(2) : -((item.sellingPrice / item.purchasePrice * 100 - 100) * item.leverage ).toFixed(2)
        
        return(
        <Tr>
          <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3);'}>{item.type}</Type>
          <Td>{item.pair}</Td>
          <Td>{item.quantityPosition}</Td>
          <Td>{item.quantitySold}</Td>
          <Td>{item.leverage}</Td>
          <Td>{item.purchasePrice}</Td>
          <Td>{item.sellingPrice}</Td>
          <Pnl color={item.purchasePrice <= item.sellingPrice ? item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)' : item.type == 'SHORT' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>
            <PnlText>{pnlAmount}$</PnlText>
            <PnlText>{pnlPercent}%</PnlText>
          </Pnl>
          <Td>{date}</Td>
        </Tr>
        )
        
      })}
      </TBody>
  )
}

export default TableBody;