import { useEffect, useRef, useState } from "react";
import api from "../../../../../../services/api";
import { Table, TableWrapper } from "../../table.styles";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";

export interface IData{
  id: number;
  status: string;
  type: string;
  pair: string;
  quantity: number;
  price: number;
  startDate: string;
  endDate: string;

}

const TableSpotOrders = () => {
  const [data, setData] = useState<IData[]>([])
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);

  const elementRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    setLoading(false);
    function handleScroll() {
      if (
        elementRef.current &&
        !isAll &&
        Number((elementRef.current.scrollTop + elementRef.current.clientHeight).toFixed(0)) === elementRef.current.scrollHeight
      ) {
        setLoading(true) 
        search == '' 
        ? fetchMore(`/api/spot/limit/history/from/${data[data.length - 1].id}`) 
        : fetchMore(`/api/spot/limit/history/pair/${search.toUpperCase()}/from/${data[data.length - 1].id}`);
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
  }, [data, search]);

  const fetchMore = async (url : string) => {
    try {
      const response = await api.get(url);
      if(response.data.length < 20){
        setIsAll(true);
      }
      setData(prev => prev.concat(response.data));
    } catch (error) {
      console.log(error)  
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      setIsAll(false);
      setData([]);
      let url;
      search == ''
      ? url = '/api/spot/limit/history'
      : url = `/api/spot/limit/history/pair/${search.toUpperCase()}`
      const response = await api.get(url);
      setData(response.data)
      if(response.data.length < 20){
        setIsAll(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    fetchData();
  }, [])

  return(
    <>
      <SearchBar setSearch={setSearch} search={search} fetchData={fetchData}/>
      <TableWrapper>
        <Table>
          <TableHead />
          <TableBody data={data} isAll={isAll} loading={loading} elementRef={elementRef}/>
        </Table>
      </TableWrapper>
    </>
  )
}

export default TableSpotOrders;