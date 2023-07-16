import { useEffect, useState } from "react";
import api from "../../../../../../services/api";
import { TBody, THead, Table, TableWrapper, Td, Th, Tr, Wrapper } from "../transactionHistory/transactionHistory.styles";
import { CancelButton, EmptyOrdersHeader, MoreOrders, OrdersHeader, OrdersLink } from "./limitOrders.styles";
import { toast } from "react-toastify";
import IWallet from "../../../../../../interfaces/Wallet.interface";

interface IOrders{
  id: number;
  type: string;
  pair: string;
  quantity: number;
  price: number;
}

interface ILimitOrders{
  wallet?: IWallet;
  symbol?: string;
}

const LimitOrders: React.FC<ILimitOrders> = ({ wallet, symbol }) => {
  const [limitOrders, setLimitOrders] = useState<IOrders[]>([])

  const getOrders = async () => {
    try {
      const result = await api.get('/api/spot/limit/orders')
      setLimitOrders(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const closeOrder = async (id : number) => {
    try {
      await api.get('/api/spot/limit/close/' + id)
      toast.success('Limit order canceled successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      getOrders()
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getOrders();
  }, [wallet, symbol])

  return(
    <Wrapper>
      <TableWrapper>
        <Table>
          <THead>
            <Tr>
              <Th width={1}>Type</Th>
              <Th width={1}>Pair</Th>
              <Th width={1}>Quantity</Th>
              <Th width={1}>Price</Th>
              <Th width={1}>Actions</Th>
            </Tr>
          </THead>
          <TBody>
          {Array.isArray(limitOrders) && limitOrders.map((item) => {
            return(
              <Tr key={item.id}>
                <Td color={item.type} weight="500">{item.type.toUpperCase()}</Td>
                <Td>{item.pair}</Td>
                <Td>{item.quantity} {item.pair.replace("USDT", "")}</Td>
                <Td>{item.price} USDT</Td>
                <Td><CancelButton onClick={() => closeOrder(item.id)}>Cancel</CancelButton></Td>
              </Tr>
            )
          })}
          </TBody>
        </Table>
      </TableWrapper>
      <MoreOrders>
        {Array.isArray(history) && history.length == 0 || !history ?
          <EmptyOrdersHeader>Currently nothing to display, trade the cryptocurrency pair with limit orders to add to the orders list</EmptyOrdersHeader>
        :
        <>
          <OrdersHeader>Wanna see more orders?</OrdersHeader>
          <OrdersLink to='/wallet/history/spot'>See more</OrdersLink>
        </>
        }
      </MoreOrders>
    </Wrapper>
  )
}

export default LimitOrders;