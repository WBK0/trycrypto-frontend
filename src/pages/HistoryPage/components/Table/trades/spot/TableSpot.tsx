import { useEffect, useRef, useState } from "react";
import api from "../../../../../../services/api";
import { Table, TableWrapper } from "../../table.styles";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";

// Data interface
export interface IData{
  id: number;
  type: string;
  pair: string;
  quantity: number;
  price: number;
  date: string;
}

// TableSpot component - renders the spot trades table
const TableSpot = () => {
  // Initialising the state
  const [data, setData] = useState<IData[]>([])
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);

  // Ref to the table body
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  // Function to get the spot trades from the api on scrolling to the bottom of the table
  useEffect(() => {
    setLoading(false);
    function handleScroll() {
      if (
        tableBodyRef.current &&
        !isAll &&
        Number((tableBodyRef.current.scrollTop + tableBodyRef.current.clientHeight).toFixed(0)) === tableBodyRef.current.scrollHeight
      ) {
        setLoading(true) 
        search == '' 
        ? fetchMore(`/api/history/spot/last/from/${data[data.length - 1].id}`) 
        : fetchMore(`/api/history/spot/last/${search.toUpperCase()}/from/${data[data.length - 1].id}`);
      }
    }

    // Adding the event listener to the table body
    if (tableBodyRef.current) {
      tableBodyRef.current.addEventListener('scroll', handleScroll);
    }

    // Removing the event listener to the table body
    return () => {
      if (tableBodyRef.current) {
        tableBodyRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [data, search]);

  // Function to fetch more data from the api 
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

  // Function to fetch data from the api on mount
  const fetchData = async () => {
    try {
      setLoading(true);
      setIsAll(false);
      setData([]);
      const response = await api.get(`/api/history/spot/last/${search.toUpperCase()}`);
      setData(response.data)
      if(response.data.length < 20){
        setIsAll(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  // Fetching data on mount
  useEffect(() => {
    fetchData();
  }, [])

  return(
    <>
      <SearchBar setSearch={setSearch} search={search} fetchData={fetchData}/>
      <TableWrapper>
        <Table>
          <TableHead />
          <TableBody data={data} isAll={isAll} loading={loading} elementRef={tableBodyRef}/>
        </Table>
      </TableWrapper>
    </>
  )
}

export default TableSpot;