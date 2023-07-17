import { useEffect, useState } from "react";
import IWallet from "../../../../../../interfaces/Wallet.interface";
import { Wrapper, TableWrapper, THead, Tr, Th, Table, TBody, Td, MoreHistory, EmptyHistoryHeader, HistoryHeader, HistoryLink } from "../transactionHistory/transactionHistory.styles";
import api from "../../../../../../services/api";
import { Status } from "./ordersHistory.styles";

interface IHistory{
  id: number;
  pair: string;
  quantity: number;
  price: number;
  type: string;
  status: string;
  startDate: string;
  endDate?: string;
}

interface IOrdersHistory{
  wallet?: IWallet;
  symbol?: string;
}

const OrdersHistory: React.FC<IOrdersHistory> = ({ wallet, symbol }) => {
  const [ordersHistory, setOrdersHistory] = useState<IHistory[]>([])

  const getOrders = async () => {
    try {
      const result = await api.get('/api/spot/limit/history/pair/' + symbol?.toUpperCase())
      setOrdersHistory(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return(
    <Wrapper>
      <TableWrapper>
        <Table>
          <THead>
            <Tr>
              <Th width={0}>Status</Th>
              <Th width={1}>Type</Th>
              <Th width={1}>Pair</Th>
              <Th width={1}>Quantity</Th>
              <Th width={1}>Price</Th>
              <Th width={1}>Total cost</Th>
              <Th width={1}>Open date</Th>
              <Th width={1}>Close date</Th>
            </Tr>
          </THead>
          <TBody>
            {Array.isArray(ordersHistory) && ordersHistory.map((item) => {
            const startDate = new Date(item.startDate).toLocaleString();
            let endDate;
            if(item.endDate){
              endDate = new Date(item.endDate).toLocaleString();
            }
            return(
              <Tr key={item.id}>
                <Status color={item.status} width='16px'>
                  {
                    item.status == 'active' && <i className="bi bi-three-dots"></i> ||
                    item.status == 'filled' && <i className="bi bi-check"></i> ||
                    item.status == 'canceled' && <i className="bi bi-x"></i>
                  }
                </Status>
                <Td color={item.type} weight="500" width='60px'>{item.type.toUpperCase()}</Td>
                <Td width='100px'>{item.pair}</Td>
                <Td width='120px'>{item.quantity} {item.pair.replace("USDT", "")}</Td>
                <Td width='120px'>{item.price} USDT</Td>
                <Td width='120px'>{Number(item.price * item.quantity).toFixed(2)} USDT</Td>
                <Td width='120px'>{startDate}</Td>
                <Td width='120px'>{endDate || 'Not closed'}</Td>
              </Tr>
            )
          })}
          </TBody>
        </Table>
      </TableWrapper>
      <MoreHistory>
        {Array.isArray(ordersHistory) && ordersHistory.length == 0 || !ordersHistory ?
          <EmptyHistoryHeader>Currently nothing to display, trade the cryptocurrency pair with limit orders to add to the history</EmptyHistoryHeader>
        :<>
        <HistoryHeader>Wanna see more history?</HistoryHeader>
        <HistoryLink to='/wallet/history/spot'>See more</HistoryLink></>
        }
      </MoreHistory>
    </Wrapper>
  )
}

export default OrdersHistory;