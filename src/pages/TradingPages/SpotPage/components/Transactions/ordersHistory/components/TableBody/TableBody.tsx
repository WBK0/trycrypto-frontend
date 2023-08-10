import { TBody, Td, Tr } from "../../../transactionHistory/transactionHistory.styles";
import { IHistory } from "../../OrdersHistory";
import { Status } from "../../ordersHistory.styles";

// TableBody interface
interface ITableBody{
  ordersHistory: IHistory[];
}

// TableBody component - renders the table body for the orders history
const TableBody : React.FC<ITableBody> = ({ ordersHistory }) => {
  return(
    <TBody>
        {Array.isArray(ordersHistory) && ordersHistory.map((item) => {
        const startDate = new Date(item.startDate).toLocaleString();
        let endDate;
        if(item.endDate){
          endDate = new Date(item.endDate).toLocaleString();
        }
        return(
          <Tr key={item.id}>
            <Status color={item.status} width='16px'>
              {
                item.status == 'active' && <i className="bi bi-three-dots"></i> ||
                item.status == 'filled' && <i className="bi bi-check"></i> ||
                item.status == 'canceled' && <i className="bi bi-x"></i>
              }
            </Status>
            <Td color={item.type} weight="500" width='60px'>{item.type.toUpperCase()}</Td>
            <Td width='100px'>{item.pair}</Td>
            <Td width='120px'>{item.quantity} {item.pair.replace("USDT", "")}</Td>
            <Td width='120px'>{item.price} USDT</Td>
            <Td width='120px'>{Number(item.price * item.quantity).toFixed(2)} USDT</Td>
            <Td width='120px'>{startDate}</Td>
            <Td width='120px'>{endDate || 'Not closed'}</Td>
          </Tr>
        )
      })}
    </TBody>
  )
}

export default TableBody;