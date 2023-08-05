import { useContext, useEffect, useState } from "react";
import api from "../../../../../../services/api";
import { EmptyHistoryHeader, HistoryHeader, HistoryLink, MoreHistory, TBody, THead, Table, TableWrapper, Td, Th, Tr, Wrapper } from "./transactionHistory.styles";
import IWallet from "../../../../../../interfaces/Wallet.interface";
import AuthContext from "../../../../../../contexts/AuthContext";

interface IHistory{
  id: number;
  type: string;
  pair: string;
  quantity: number;
  price: string;
  date: string;
}

interface ITransactionHistory{
  wallet?: IWallet;
  symbol?: string;
}

const TransactionHistory : React.FC<ITransactionHistory> = ({ wallet, symbol }) => {
  const [history, setHistory] = useState<IHistory>()

  const { isLoggedIn } = useContext(AuthContext);

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
          <THead>
            <Tr>
              <Th width={16.66}>
                Type
              </Th>
              <Th width={16.66}>
                Pair
              </Th>
              <Th width={16.66}>
                Quantity
              </Th>
              <Th width={16.66}>
                Price
              </Th>
              <Th width={16.66}>
                Total price
              </Th>
              <Th width={16.66}>
                Date
              </Th>
            </Tr>
          </THead>
          <TBody>
          {Array.isArray(history) && history.map((item) => {
            const date = new Date(item.date).toLocaleString();
            return(
            <Tr key={item.id}>
              <Td color={item.type} width="50px" weight='600'>
                {item.type.toUpperCase()}
              </Td>
              <Td width="120px" weight='400'>
                {item.pair}
              </Td>
              <Td width="120px" weight='400'>
                {item.quantity} {item.pair.replace('USDT', '')}
              </Td>
              <Td width="140px" weight='400'>
                {item.price.toFixed(4)} USDT
              </Td>
              <Td width="140px" weight='400'>
                {(item.price * item.quantity).toFixed(4)} USDT
              </Td>
              <Td width="160px" weight='400'>
                {date}
              </Td>
            </Tr>)
            })}
          </TBody>
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