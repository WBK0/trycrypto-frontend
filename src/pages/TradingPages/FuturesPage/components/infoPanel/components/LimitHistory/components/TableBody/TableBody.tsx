import { TBody, Td, Tr, Type } from "../../../../infoPanel.styles";
import { IOrders } from "../../LimitHistory";
import { Status } from "../../limitHistory.styles";

// TableBody interface
interface ITableBody{
  history: IOrders[];
}

// TableBody component - renders the table body
const TableBody : React.FC<ITableBody> = ({ history }) => {
  return(
    <TBody>
      {history.map((item) => {
        const startDate = new Date(item.startDate).toLocaleString();
        let endDate;
        if(item.endDate){
          endDate = new Date(item.endDate).toLocaleString();
        }
        return(
        <Tr key={item.id}>
          <Status color={item.status}>
            {
              item.status == 'active' && <i className="bi bi-three-dots"></i> ||
              item.status == 'filled' && <i className="bi bi-check"></i> ||
              item.status == 'canceled' && <i className="bi bi-x"></i>
            }
          </Status>
          <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3);'}>{item.type}</Type>
          <Td>{item.pair}</Td>
          <Td>{item.quantity}</Td>
          <Td>{item.price}</Td>
          <Td>{item.leverage}</Td>
          <Td>{item.takeProfit || 0}</Td>
          <Td>{item.stopLoss || 0}</Td>
          <Td>{startDate}</Td>
          <Td>{endDate || 'Not closed'}</Td>
        </Tr>
        )
      })}
    </TBody>
  )
}

export default TableBody;