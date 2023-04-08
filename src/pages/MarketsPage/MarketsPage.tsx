import { useEffect, useState } from "react";
import Layout from "../../layout/Layout/Layout";
import Pagination from "../../components/Markets/Table/Pagination/Pagination";
import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import {
  RankingInfo,
} from '@tanstack/match-sorter-utils'
import Thead from "../../components/Markets/Table/Table/Thead";
import Tbody from "../../components/Markets/Table/Table/Tbody";
import { columns } from '../../components/Markets/Table/columns/columns';
import getData from "../../components/Markets/Table/services/getData";
import Searchbar from "../../components/Markets/Table/Searchbar/Searchbar";
import { fuzzyFilter } from './../../components/Markets/Table/filters/fuzzyFilter';

// Extending the filterFns interface of react-table to include a fuzzy filter function
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>  
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const MarketsPage = () => {
  // Initializing state variables
  const [data, setData] = useState(() => [])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    // Setting initial page size and fetching data using the getData function
    table.setPageSize(5);
  
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };
  
    fetchData();
  
    // Setting up an interval to fetch data
    const interval = setInterval(fetchData, 6000);

    // Clearing the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
 
   // Creating the react-table instance with specified configurations
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter
    },
    autoResetAll: false,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Rendering the MarketsPage
  return(
    <Layout>
      <Searchbar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <div className="row">
        <div className="table-responsive">
          <table className='table text-light'>
          <Thead table={table} />
          <Tbody table={table} />
        </table>
        </div>
      </div>
      
      <Pagination table={table} />
      <div className="h-4" />
    </Layout>
  )
}

export default MarketsPage;