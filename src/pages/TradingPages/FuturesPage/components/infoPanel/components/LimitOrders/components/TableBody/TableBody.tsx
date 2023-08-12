import { toast } from "react-toastify";
import { Buttons, CloseButton, TBody, Td, Tr, Type } from "../../../../infoPanel.styles";
import api from "../../../../../../../../../services/api";

// TableBody interface
interface ITableBody{
  orders: any[];
  fetchBalance: () => void;
}

// TableBody component - renders the table body
const TableBody : React.FC<ITableBody> = ({ orders, fetchBalance }) => {
  // Function handleCloseOrder - handles the close order
  const handleCloseOrder = async (id: number) => {
    try {
      // Sending the request to the api to close the order by id 
      await api.get('/api/derivatives/limit/close/' + id);
      // Showing a success toast 
      toast.success('Limit order canceled successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      // Fetching the balance
      fetchBalance();
    } catch (error) {
      // Showing an error toast if the request failed and logging the error
      console.error(error);
      toast.error('Error canceling limit order', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }

  return(
    <TBody>
      {orders.slice().reverse().map((item) => {
        return(
        <Tr key={item.id}>
          <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3);'}>{item.type}</Type>
          <Td>{item.pair}</Td>
          <Td>{item.quantity}</Td>
          <Td>{item.price}</Td>
          <Td>{item.leverage}</Td>
          <Td>{item.takeProfit || 0}</Td>
          <Td>{item.stopLoss || 0}</Td>
          <Buttons>
            <CloseButton onClick={() => handleCloseOrder(item.id)}>Close</CloseButton>
          </Buttons>
        </Tr>
        )
      })}
      
    </TBody>
  )
}

export default TableBody;