import { useContext, useEffect, useState } from "react";
import api from "../../../../../../services/api";
import { EmptyHistoryHeader, HistoryHeader, HistoryLink, MoreHistory, TBody, THead, Table, TableWrapper, Td, Th, Tr, Wrapper } from "./transactionHistory.styles";
import IWallet from "../../../../../../interfaces/Wallet.interface";
import AuthContext from "../../../../../../contexts/AuthContext";
import TableHead from "./components/TableHead/TableHead";
import TableBody from "./components/TableBody/TableBody";

// Interface for the history
export interface IHistory{
  id: number;
  type: string;
  pair: string;
  quantity: number;
  price: string;
  date: string;
}

// TransactionHistory interface
interface ITransactionHistory{
  wallet?: IWallet;
  symbol?: string;
}

// TransactionHistory component - renders the transaction history table
const TransactionHistory : React.FC<ITransactionHistory> = ({ wallet, symbol }) => {
  // Initialising the state
  const [history, setHistory] = useState<IHistory[]>()

  // Getting the isLoggedIn state from the AuthContext
  const { isLoggedIn } = useContext(AuthContext);

  // Function to get the history from the api
  const getHistory = async () => {
    if(isLoggedIn == false)
      setHistory(undefined)
    try {
      const response = await api.get('/api/history/spot/last/' + symbol?.toUpperCase(), {
        withCredentials: true
      })
      setHistory(response.data)
    } catch (error) {
      console.error(error)
    }
  }
 
  // Use effect to get the history when the wallet or symbol or login status changes and on mount
  useEffect(() => {
    getHistory()
  }, [wallet, symbol, isLoggedIn])

  return(
    <Wrapper>
      {Array.isArray(history) && history.length == 0 || !history 
      ? <EmptyHistoryHeader>Currently nothing to display, trade the cryptocurrency pair to add to the history</EmptyHistoryHeader>
      :
      <TableWrapper>
        <Table>
          <TableHead />
          <TableBody 
            history={history} 
          />
        </Table>
        <MoreHistory>
          <HistoryHeader>Wanna see more history?</HistoryHeader>
          <HistoryLink to='/history/trades'>See more</HistoryLink>
        </MoreHistory>
      </TableWrapper>
      }
    </Wrapper>
  )
}

export default TransactionHistory;