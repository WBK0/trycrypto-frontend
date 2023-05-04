import { useEffect, useState } from "react";
import api from "../../../../../services/api";
import { HeadingSelect, HistoryHeader, HistoryLink, MoreHistory, SelectButton, TBody, THead, Table, TableWrapper, Td, Th, Tr, Wrapper } from "./transactionHistory.styles";
import IWallet from "../../../../../interfaces/Wallet.interface";

interface IHistory{
  type: string;
  pair: string;
  quantity: number;
  price: string;
  date: string;
}

interface ITransactionHistory{
  wallet?: IWallet;
}

const TransactionHistory : React.FC<ITransactionHistory> = ({ wallet }) => {
  const [history, setHistory] = useState<IHistory>()

  const getHistory = async () => {
    try {
      const response = await api.get('/api/history/spot/last', {
        withCredentials: true
      })
      setHistory(response.data)
    } catch (error) {
      console.error(error)
    }
  }
 
  useEffect(() => {
    getHistory()
  }, [wallet])
  
  return(
    <Wrapper>
      <HeadingSelect>
        <SelectButton active={true}>Transaction History</SelectButton>
        <SelectButton>Orders History</SelectButton>
      </HeadingSelect>
      <TableWrapper>
      <Table>
        <THead>
          <Tr>
            <Th width={20}>
              Type
            </Th>
            <Th width={20}>
              Pair
            </Th>
            <Th width={20}>
              Quantity
            </Th>
            <Th width={20}>
              Price
            </Th>
            <Th width={20}>
              Date
            </Th>
          </Tr>
        </THead>
        <TBody>
        {Array.isArray(history) && history.map((item) => {
          const date = new Date(item.date).toLocaleString();
          return(
          <Tr>
            <Td color={item.type == 'buy' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'} width="50px" weight='600'>
              {item.type.toUpperCase()}
            </Td>
            <Td width="110px" weight='400'>
              {item.pair}
            </Td>
            <Td width="90px" weight='400'>
              {item.quantity} {item.pair.replace('USDT', '')}
            </Td>
            <Td width="140px" weight='400'>
              {item.price} USDT
            </Td>
            <Td width="160px" weight='400'>
              {date}
            </Td>
          </Tr>)
          })}
        </TBody>
      </Table>
      </TableWrapper>
      <MoreHistory>
        <HistoryHeader>Wanna see more history?</HistoryHeader>
        <HistoryLink to='/wallet/history/spot'>See more</HistoryLink>
      </MoreHistory>
    </Wrapper>
  )
}

export default TransactionHistory;