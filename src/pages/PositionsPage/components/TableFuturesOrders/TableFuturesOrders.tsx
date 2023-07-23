import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { Actions, CloseButton, TBody, THead, Table, TableWrapper, Td, Th, ThActions, Tr, Wrapper } from "../tableSpotOrders.styles";
import { toast } from "react-toastify";

interface IFuturesOrders{
  id: number;
  type: string;
  pair: string;
  price: number;
  quantity: number;
  takeProfit: number;
  stopLoss: number;
  leverage: number;
}

interface ITableFuturesOrders {
  prices: {
    [pair: string]: {
      lastPrice: number;
    };
  };
}

const TableFuturesOrders: React.FC<ITableFuturesOrders> = ({prices}) => {
  const [futuresOrders, setFuturesOrders] = useState<IFuturesOrders[]>([])

  const getFuturesOrders = async () => {
    try {
      const response = await api.get('/api/derivatives/limit/orders');
      setFuturesOrders(response.data)
    } catch (error) { 
      console.log(error)
    }
  }

  const closeOrder = async (id: number) => {
    try {
      const response = await api.get('/api/derivatives/limit/close/' + id);
      toast.success('Successfully closed order', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });      
      getFuturesOrders()
    } catch (error) {
      toast.error('The order has not been closed', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });   
      console.error(error);
    }
  }

  useEffect(() => {
    getFuturesOrders();
  }, [])

  return(
    <Wrapper>
      <TableWrapper>
        <Table>
          <THead>
            <Tr>
              <Th>Type</Th>
              <Th>Pair</Th>
              <Th>Quantity</Th>
              <Th>Order price</Th>
              <Th>Pair price</Th>
              <Th>Leverage</Th>
              <Th>Take profit</Th>
              <Th>Stop loss</Th>
              <ThActions>Actions</ThActions>
            </Tr>
          </THead>
          <TBody>
            {futuresOrders.map((item) => {
              return(
              <Tr>
                <Td width="60px" color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Td>
                <Td width="100px">{item.pair}</Td>
                <Td width="140px">{item.quantity} {item.pair.replace("USDT", "")}</Td>
                <Td width="160px">{Number(item.price).toFixed(4)} USDT</Td>
                <Td width="150px">{Number(prices[item.pair.toUpperCase()]?.lastPrice).toFixed(4)} USDT</Td>
                <Td width="70px">{item.leverage}</Td>
                <Td width="140px">{item.takeProfit || 0} USDT</Td>
                <Td width="140px">{item.stopLoss || 0} USDT</Td>
                <Actions width="100px">
                  <CloseButton onClick={() => closeOrder(item.id)}>
                    Close
                  </CloseButton>
                </Actions>
              </Tr>
              )
            })}
          </TBody>
        </Table>
      </TableWrapper>
    </Wrapper>
  )
}

export default TableFuturesOrders;