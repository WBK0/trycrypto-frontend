import { Actions, CloseButton, TBody, Td, Tr } from "../../tableSpotOrders.styles";
import { IFuturesOrders } from "../TableFuturesOrders";

// Table Body interface
interface ITableBody {
  futuresOrders: IFuturesOrders[];
  prices: {
    [pair: string]: {
      lastPrice: number;
    };
  };
  closeOrder: (id: number) => void;
}

// TableBody component - renders the table body
const TableBody : React.FC<ITableBody> = ({ futuresOrders, prices, closeOrder }) => {
  return(
    <TBody>
      {futuresOrders.map((item) => {
        return(
        <Tr>
          <Td width="60px" color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Td>
          <Td width="100px">{item.pair}</Td>
          <Td width="140px">{item.quantity} {item.pair.replace("USDT", "")}</Td>
          <Td width="160px">{Number(item.price).toFixed(4)} USDT</Td>
          <Td width="150px">{Number(prices[item.pair.toUpperCase()]?.lastPrice).toFixed(4)} USDT</Td>
          <Td width="70px">{item.leverage}</Td>
          <Td width="140px">{item.takeProfit || 0} USDT</Td>
          <Td width="140px">{item.stopLoss || 0} USDT</Td>
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