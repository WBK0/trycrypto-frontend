import { useEffect, useState } from "react";
import api from "../../../../../../../services/api";
import { THead, Table, Th, Tr } from "../../infoPanel.styles";
import TableBody from "./TableBody";

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
  const [history, setHistory] = useState<IHistory[]>()

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
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHistory()
  }, [])

  return(
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
  )
}

export default TransactionHistoryView;