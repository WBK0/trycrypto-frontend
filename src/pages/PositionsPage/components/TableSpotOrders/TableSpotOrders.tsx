import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { Actions, CloseButton, TBody, THead, Table, TableWrapper, Td, Th, ThActions, Tr, Wrapper } from "./tableSpotOrders.styles";

interface ISpotOrders{
  id: number;
  type: string;
  pair: string;
  price: number;
  quantity: number;
}

interface ITableSpotOrders {
  prices: {
    [pair: string]: {
      lastPrice: number;
    };
  };
}

const TableSpotOrders: React.FC<ITableSpotOrders> = ({prices}) => {
  const [spotOrders, setSpotOrders] = useState<ISpotOrders[]>([])

  const getSpotOrders = async () => {
    try {
      const response = await api.get('/api/spot/limit/orders');
      setSpotOrders(response.data)
    } catch (error) { 
      console.log(error)
    }
  }

  const closeOrder = async (id: number) => {
    try {
      const response = await api.get('/api/spot/limit/close/' + id);
      console.log(response)
      getSpotOrders()
    } catch (error) {
      console.error(error);
    }
  }

  console.log(prices)

  useEffect(() => {
    getSpotOrders();
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
              <Th>Order cost</Th>
              <ThActions>Actions</ThActions>
            </Tr>
          </THead>
          <TBody>
            {spotOrders.map((item) => {
              return(
              <Tr>
                <Td width="60px" color={item.type == 'buy' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Td>
                <Td width="130px">{item.pair}</Td>
                <Td width="150px">{item.quantity} {item.pair.replace("USDT", "")}</Td>
                <Td width="160px">{Number(item.price).toFixed(4)} USDT</Td>
                <Td width="150px">{Number(prices[item.pair.toUpperCase()]?.lastPrice).toFixed(4)} USDT</Td>
                <Td width="160px">{Number(item.price * item.quantity).toFixed(4)} USDT</Td>
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

export default TableSpotOrders;