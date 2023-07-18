import { useEffect, useState } from "react";
import api from "../../../../../../../services/api";
import { THead, Table, Text, Th, Tr } from "../../infoPanel.styles";
import TableBody from "./TableBody";
import LoadingTable from "../../../../../../../components/Loading/LoadingTable";

export interface IHistory{
  type: string;
  pair: string;
  date: string;
  quantityPosition: number;
  quantitySold: number;
  purchasePrice: number;
  sellingPrice: number;
  leverage: number;
}

const TransactionHistoryView = () => {
  const [history, setHistory] = useState<IHistory[]>([])
  const [loading, setLoading] = useState(true);

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
          <THead>
            <Tr>
              <Th>Type</Th>
              <Th>Pair</Th>
              <Th>Quantity</Th>
              <Th>Sold</Th>
              <Th>Leverage</Th>
              <Th>PurchasePrice</Th>
              <Th>SellingPrice</Th>
              <Th>PNL</Th>
              <Th>Date</Th>
            </Tr>
          </THead>
          <TableBody history={history}/>
        </Table>
    }
  </>
    
  )
}

export default TransactionHistoryView;