import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { NoOpened, Table, TableWrapper, Wrapper } from "../tableSpotOrders.styles";
import { toast } from "react-toastify";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";

// Interface for the spot orders
export interface ISpotOrders{
  id: number;
  type: string;
  pair: string;
  price: number;
  quantity: number;
}

// Interface for component props
interface ITableSpotOrders {
  prices: {
    [pair: string]: {
      lastPrice: number;
    };
  };
}

// TableSpotOrders component - renders the spot orders table
const TableSpotOrders: React.FC<ITableSpotOrders> = ({prices}) => {
  // Initialising the state
  const [spotOrders, setSpotOrders] = useState<ISpotOrders[]>([])

  // Function to get the spot orders from the api
  const getSpotOrders = async () => {
    try {
      const response = await api.get('/api/spot/limit/orders');
      setSpotOrders(response.data)
    } catch (error) { 
      console.log(error)
    }
  }

  // Function to close an order by id 
  const closeOrder = async (id: number) => {
    try {
      // Sending a request to the api to close the order
      await api.get('/api/spot/limit/close/' + id);
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
      // Refreshing the spot orders
      getSpotOrders()
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

  // Function to get the spot orders on component mount
  useEffect(() => {
    getSpotOrders();
  }, [])

  return(
    <Wrapper>
      <TableWrapper>
      { // If there are no spot orders, display a message
          spotOrders.length == 0
          ? <NoOpened>You don't have any open orders in the spot market</NoOpened>
          : <Table>
              <TableHead />
              <TableBody
                spotOrders={spotOrders}
                prices={prices}
                closeOrder={closeOrder} 
              />
            </Table>
        }
      </TableWrapper>
    </Wrapper>
  )
}

export default TableSpotOrders;