import { useEffect, useState } from "react"
import { Table, Text } from "../../infoPanel.styles"
import api from "../../../../../../../services/api";
import IWallet from "../../../../../../../interfaces/Wallet.interface";
import LoadingTable from "../../../../../../../components/Loading/LoadingTable";
import TableHead from "./components/TableHead/TableHead";
import TableBody from "./components/TableBody/TableBody";

// LimitOrders interface
interface ILimitOrders{
  symbol?: string;
  balance?: IWallet;
  fetchBalance: () => void;
}

// Interface for the orders
export interface IOrders{
  id: number;
  type: string;
  pair: string;
  quantity: number;
  price: number;
  leverage: number;
  takeProfit: number;
  stopLoss: number;
}

// LimitOrders component - renders the limit orders table
const LimitOrders : React.FC<ILimitOrders> = ({ symbol, balance, fetchBalance }) => {
  // Initialising the state
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to get the limit orders from the api
  const getOrders = async () => {
    try {
      const response = await api.get('/api/derivatives/limit/orders/pair/' + symbol?.toUpperCase());
      setOrders(response.data)
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  // Use effect to get the limit orders on balance and symbol change
  useEffect(() => {
    getOrders();
  }, [balance, symbol])

  return(
    <>
      {
        loading 
        ? 
          <LoadingTable />
        :
          orders.length >= 1 
        ?
          <Table>
            <TableHead />
            <TableBody 
              orders={orders} 
              fetchBalance={fetchBalance} 
            />
          </Table>
        :
          <Text>
            You don't have any open limit orders.
          </Text>
      }
      
    </>
  )
}

export default LimitOrders;