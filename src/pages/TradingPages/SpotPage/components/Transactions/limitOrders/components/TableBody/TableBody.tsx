import { toast } from "react-toastify";
import api from "../../../../../../../../services/api";
import { TBody, Td, Tr } from "../../../transactionHistory/transactionHistory.styles";
import { IOrders } from "../../LimitOrders";
import { CancelButton } from "../../limitOrders.styles";

// TableBody interface
interface ITableBody{
  limitOrders: IOrders[],
  fetchBalance: () => void
}

// TableBody component - renders the table body for limit orders
const TableBody : React.FC<ITableBody> = ({ limitOrders, fetchBalance }) => {
  // Function to close an order by id
  const closeOrder = async (id : number) => {
    try {
      // Send request to close order by id
      await api.get('/api/spot/limit/close/' + id)
      // Show success toast
      toast.success('Limit order canceled successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      // Fetch balance
      fetchBalance();
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <TBody>
      {Array.isArray(limitOrders) && limitOrders.map((item) => {
        return(
          <Tr key={item.id}>
            <Td color={item.type} weight="500" width="50px">{item.type.toUpperCase()}</Td>
            <Td width="100px">{item.pair}</Td>
            <Td width="100px">{item.quantity} {item.pair.replace("USDT", "")}</Td>
            <Td width="100px">{item.price} USDT</Td>
            <Td width="100px"><CancelButton onClick={() => closeOrder(item.id)}>Cancel</CancelButton></Td>
          </Tr>
        )
      })}
    </TBody>
  )
}

export default TableBody;