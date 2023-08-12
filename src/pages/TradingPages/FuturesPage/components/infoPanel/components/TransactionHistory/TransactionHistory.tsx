import { useEffect, useState } from "react";
import api from "../../../../../../../services/api";
import { Table, Text } from "../../infoPanel.styles";
import TableBody from "./components/TableBody/TableBody";
import LoadingTable from "../../../../../../../components/Loading/LoadingTable";

// Interface for the history
export interface IHistory{
  id: number;
  type: string;
  pair: string;
  date: string;
  quantityPosition: number;
  quantitySold: number;
  purchasePrice: number;
  sellingPrice: number;
  leverage: number;
}

// TransactionHistoryView component - renders the transaction history table
const TransactionHistoryView = () => {
  // Initialising the state
  const [history, setHistory] = useState<IHistory[]>([])
  const [loading, setLoading] = useState(true);

  // Function to get the history from the api
  const getHistory = async () => {
    try {
      const response = await api.get('/api/history/futures/last', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
      setHistory(response.data)
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  // Use effect to get the history on component mount
  useEffect(() => {
    getHistory()
  }, [])

  return(
  <>
    {loading 
    ?
      <LoadingTable />
    :
      history.length <= 0 
      ? 
        <Text>
          There are no trades in your futures trading history
        </Text>
      : 
        <Table>
          
          <TableBody history={history}/>
        </Table>
    }
  </>
    
  )
}

export default TransactionHistoryView;