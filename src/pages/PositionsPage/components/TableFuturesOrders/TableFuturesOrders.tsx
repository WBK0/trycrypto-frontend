import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { NoOpened, Table, TableWrapper, Wrapper } from "../tableSpotOrders.styles";
import { toast } from "react-toastify";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";

// Interface for the futures orders
export interface IFuturesOrders{
  id: number;
  type: string;
  pair: string;
  price: number;
  quantity: number;
  takeProfit: number;
  stopLoss: number;
  leverage: number;
}

// Table Futures Orders interface
interface ITableFuturesOrders {
  prices: {
    [pair: string]: {
      lastPrice: number;
    };
  };
}

// TableFuturesOrders component - renders the futures orders table
const TableFuturesOrders: React.FC<ITableFuturesOrders> = ({prices}) => {
  // Initialising the state
  const [futuresOrders, setFuturesOrders] = useState<IFuturesOrders[]>([])

  // Function to get the futures orders from the api
  const getFuturesOrders = async () => {
    try {
      const response = await api.get('/api/derivatives/limit/orders');
      setFuturesOrders(response.data)
    } catch (error) { 
      console.log(error)
    }
  }

  // Function to close an order by id 
  const closeOrder = async (id: number) => {
    try {
      // Sending a request to the api to close the order
      await api.get('/api/derivatives/limit/close/' + id);
      // Showing a success toast
      toast.success('Successfully closed order', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });      
      // Refreshing the futures orders
      getFuturesOrders()
    } catch (error) {
      // Showing an error toast if the request failed and logging the error
      toast.error('The order has not been closed', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });   
      console.error(error);
    }
  }

  // Function to get the futures orders on component mount
  useEffect(() => {
    getFuturesOrders();
  }, [])

  return(
    <Wrapper>
      <TableWrapper>
        <Table>
          <TableHead />
          <TableBody 
            prices={prices}
            futuresOrders={futuresOrders}
            closeOrder={closeOrder}
          />
        </Table>
        {
          futuresOrders.length == 0
          ? <NoOpened>You don't have any open orders in the futures market</NoOpened>
          : null
        }
      </TableWrapper>
    </Wrapper>
  )
}

export default TableFuturesOrders;