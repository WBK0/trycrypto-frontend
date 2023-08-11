import { Actions, CloseButton, TBody, Td, Tr } from "../../tableSpotOrders.styles";
import { ISpotOrders } from "../TableSpotOrders";

// Interface TableBody 
interface ITableBody {
  spotOrders: ISpotOrders[];
  prices: {
    [pair: string]: {
      lastPrice: number;
    };
  };
  closeOrder: (id: number) => void;
}

// TableBody component - renders the table body
const TableBody : React.FC<ITableBody> = ({ spotOrders, prices, closeOrder }) => {
  return(
    <TBody>
    {spotOrders.map((item) => {
      return(
      <Tr key={item.id}>
        <Td width="60px" color={item.type == 'buy' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Td>
        <Td width="130px">{item.pair}</Td>
        <Td width="150px">{item.quantity} {item.pair.replace("USDT", "")}</Td>
        <Td width="160px">{Number(item.price).toFixed(4)} USDT</Td>
        <Td width="150px">{Number(prices[item.pair.toUpperCase()]?.lastPrice).toFixed(4)} USDT</Td>
        <Td width="160px">{Number(item.price * item.quantity).toFixed(4)} USDT</Td>
        <Actions width="100px">
          <CloseButton onClick={() => closeOrder(item.id)}>
            Close
          </CloseButton>
        </Actions>
      </Tr>
      )
    })}
    
  </TBody>
  )
}

export default TableBody;