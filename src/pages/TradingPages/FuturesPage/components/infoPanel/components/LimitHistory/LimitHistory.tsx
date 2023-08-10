import { useEffect, useState } from "react"
import { Table, Text } from "../../infoPanel.styles"
import api from "../../../../../../../services/api";
import IWallet from "../../../../../../../interfaces/Wallet.interface";
import LoadingTable from "../../../../../../../components/Loading/LoadingTable";
import TableHead from "./components/TableHead/TableHead";
import TableBody from "./components/TableBody/TableBody";

// HistoryOrders interface
interface IHistoryOrders{
  symbol?: string;
  balance?: IWallet;
  fetchBalance: () => void;
}

// Interface for the orders
export interface IOrders{
  id: number;
  status: string;
  type: string;
  pair: string;
  quantity: number;
  price: number;
  leverage: number;
  takeProfit: number;
  stopLoss: number;
  startDate: string;
  endDate: string;
}

// HistoryOrders component - renders the history orders table
const HistoryOrders : React.FC<IHistoryOrders> = ({ symbol, balance }) => {
  // Initialising the state
  const [history, setHistory] = useState<IOrders[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to get the history orders from the api
  const getHistory = async () => {
    try {
      const response = await api.get('/api/derivatives/limit/history/pair/' + symbol?.toUpperCase());
      setHistory(response.data)
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  // Use effect to get the history orders
  useEffect(() => {
    getHistory();
  }, [balance, symbol])

  return(
    <>
      {
        loading 
        ?
          <LoadingTable />
        :
        history.length >= 1 
        ?
          <Table>
            <TableHead />
            <TableBody 
              history={history}
            />
          </Table>
        :
          <Text>
            There are no limit orders in the history.
          </Text>
      }
    </>
  )
}

export default HistoryOrders;