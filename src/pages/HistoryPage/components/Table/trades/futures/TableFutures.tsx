import { useEffect, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Table, TableWrapper } from "../../table.styles";
import api from "../../../../../../services/api";
import TableHead from "./components/TableHead/TableHead";
import TableBody from "./components/TableBody/TableBody";

// Data interface
export interface IData{
  id: number;
  type: string;
  pair: string;
  quantityPosition: number;
  quantitySold: number;
  leverage: number;
  purchasePrice: number;
  sellingPrice: number;
  date: string;
}

// TableFutures component - renders the trades futures table 
const TableFutures = () => {
  // Initialising the state
  const [data, setData] = useState<IData[]>([])
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);

  // Ref to the table body
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  // Function to get the trades futures from the api on scrolling to the bottom of the table
  useEffect(() => {
    setLoading(false);
    function handleScroll() {
      if (
        tableBodyRef.current &&
        !isAll &&
        search == '' &&
        Number((tableBodyRef.current.scrollTop + tableBodyRef.current.clientHeight).toFixed(0)) === tableBodyRef.current.scrollHeight
      ) {
        setLoading(true)
        fetchMore(`/api/history/futures/last/from/${data[data.length - 1].id}`);
      } else if(
        tableBodyRef.current &&
        !isAll &&
        search !== '' &&
        Number((tableBodyRef.current.scrollTop + tableBodyRef.current.clientHeight).toFixed(0)) === tableBodyRef.current.scrollHeight
      ){
        setLoading(true)
        fetchMore(`/api/history/futures/last/${search.toUpperCase()}/from/${data[data.length - 1].id}`);
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

  // Function to fetch more data from the api on scrolling to the bottom of the table
  const fetchMore = async (url: string) => {
    try {
      console.log('fetchmore')
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
      const response = await api.get(`/api/history/futures/last/${search.toUpperCase()}`);
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
          <TableBody 
            data={data}
            loading={loading}
            tableBodyRef={tableBodyRef}
            isAll={isAll}
          />
        </Table>
      </TableWrapper>
   </> 
  )
}

export default TableFutures;