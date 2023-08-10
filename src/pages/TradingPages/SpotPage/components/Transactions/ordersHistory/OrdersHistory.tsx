import { useEffect, useState } from "react";
import IWallet from "../../../../../../interfaces/Wallet.interface";
import { Wrapper, TableWrapper, THead, Tr, Th, Table, TBody, Td, MoreHistory, EmptyHistoryHeader, HistoryHeader, HistoryLink } from "../transactionHistory/transactionHistory.styles";
import api from "../../../../../../services/api";
import TableHead from "../limitOrders/components/TableHead/TableHead";
import TableBody from "./components/TableBody/TableBody";

// Interface for the history
export interface IHistory{
  id: number;
  pair: string;
  quantity: number;
  price: number;
  type: string;
  status: string;
  startDate: string;
  endDate?: string;
}

// OrdersHistory interface
interface IOrdersHistory{
  wallet?: IWallet;
  symbol?: string;
}

// OrdersHistory component - renders the orders history table
const OrdersHistory: React.FC<IOrdersHistory> = ({ wallet, symbol }) => {
  // Initialising the state
  const [ordersHistory, setOrdersHistory] = useState<IHistory[]>([])

  // Function to get the orders history from the api
  const getOrders = async () => {
    try {
      const result = await api.get('/api/spot/limit/history/pair/' + symbol?.toUpperCase())
      setOrdersHistory(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Use effect to get the orders history when the wallet or symbol changes and on mount
  useEffect(() => {
    getOrders()
  }, [wallet, symbol])

  return(
    <Wrapper>
      {Array.isArray(ordersHistory) && ordersHistory.length == 0 || !ordersHistory
      ? <EmptyHistoryHeader>Currently nothing to display, trade the cryptocurrency pair with limit orders to add to the history</EmptyHistoryHeader>
      : 
      <TableWrapper>
        <Table>
          <TableHead />
          <TableBody ordersHistory={ordersHistory} />
        </Table>
        <MoreHistory>
          <HistoryHeader>Wanna see more history?</HistoryHeader>
          <HistoryLink to='/history/orders'>See more</HistoryLink>
        </MoreHistory>
      </TableWrapper>
      }
   
    </Wrapper>
  )
}

export default OrdersHistory;