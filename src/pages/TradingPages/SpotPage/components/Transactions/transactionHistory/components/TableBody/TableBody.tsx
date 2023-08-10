import { IHistory } from "../../TransactionHistory";
import { TBody, Td, Tr } from "../../transactionHistory.styles";

// TableBody interface
interface ITableBody{
  history: IHistory[];
}

// TableBody component - renders the table body for the transaction history
const TableBody : React.FC<ITableBody> = ({ history }) => {
  return(
    <TBody>
      {Array.isArray(history) && history.map((item) => {
        const date = new Date(item.date).toLocaleString();
        return(
        <Tr key={item.id}>
          <Td color={item.type} width="50px" weight='600'>
            {item.type.toUpperCase()}
          </Td>
          <Td width="120px" weight='400'>
            {item.pair}
          </Td>
          <Td width="120px" weight='400'>
            {item.quantity} {item.pair.replace('USDT', '')}
          </Td>
          <Td width="140px" weight='400'>
            {Number(item.price).toFixed(4)} USDT
          </Td>
          <Td width="140px" weight='400'>
            {(Number(item.price) * item.quantity).toFixed(4)} USDT
          </Td>
          <Td width="160px" weight='400'>
            {date}
          </Td>
        </Tr>)
        })}
      </TBody>  
  )
}

export default TableBody;