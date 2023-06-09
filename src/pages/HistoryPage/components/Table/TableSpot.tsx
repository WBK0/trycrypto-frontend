import { useEffect, useRef, useState } from "react";
import api from "../../../../services/api";
import { TBody, THead, Table, TableWrapper, Td, Th, Tr } from "./tableSpot.styles";
import SearchBar from "./components/SearchBar/SearchBar";

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
  const [search, setSearch] = useState('');

  const elementRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (
        elementRef.current &&
        Number((elementRef.current.scrollTop + elementRef.current.clientHeight).toFixed(0)) === elementRef.current.scrollHeight
      ) {
        alert('Przewinięto na sam dół!');
      }
    }

    if (elementRef.current) {
      elementRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
    <>
      <SearchBar setSearch={setSearch} search={search}/>
      <TableWrapper>
        <Table>
          <THead>
            <Tr>
              <Th>Type</Th>
              <Th>Pair</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
              <Th>Total cost</Th>
              <Th>Date</Th>
            </Tr>
          </THead>
          <TBody ref={elementRef}>
            {data && data.filter(item => item.pair.includes(search.toUpperCase())).map((item) => {
              const date = new Date(item.date).toLocaleString();
              return(
                <Tr key={item.id}>
                  <Td color={item.type == 'buy' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'} weight={500}>{item.type.toUpperCase()}</Td>
                  <Td>{item.pair}</Td>
                  <Td>{item.quantity} {item.pair.replace("USDT" , "")}</Td>
                  <Td>{item.price} USDT</Td>
                  <Td>{(item.quantity * item.price).toFixed(item.price >= 20 ? 4 : 2)} USDT</Td>
                  <Td>{date}</Td>
                </Tr>
              )
            })} 
          </TBody>
        </Table>
      </TableWrapper>
    </>
  )
}

export default TableSpot;