import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { TBody, THead, Table, TableWrapper, Td, Th, Tr } from "./tableSpot.styles";

interface IData{
  id: number;
  type: string;
  pair: string;
  quantity: number;
  price: number;
  date: string;
}

const TableSpot = () => {
  const [data, setData] = useState<IData[]>([])

  const fetchData = async () => {
    try {
      const response = await api.get('/api/history/spot/last');
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    fetchData();
  }, [])

  return(
    <TableWrapper>
      <Table>
        <THead>
          <Tr>
            <Th>Type</Th>
            <Th>Pair</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Total price</Th>
            <Th>Date</Th>
          </Tr>
        </THead>
        <TBody>
          {data && data.map((item) => {
            const date = new Date(item.date).toLocaleString();
            return(
              <Tr key={item.id}>
                <Td color={item.type == 'buy' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'} weight={500}>{item.type.toUpperCase()}</Td>
                <Td>{item.pair}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.price} USDT</Td>
                <Td>{item.quantity * item.price} USDT</Td>
                <Td>{date}</Td>
              </Tr>
            )
          })} 
        </TBody>
      </Table>
    </TableWrapper>
  )
}

export default TableSpot;