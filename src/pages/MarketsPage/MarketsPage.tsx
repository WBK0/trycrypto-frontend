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
import getData from "../../components/Markets/services/getData";
import Searchbar from "../../components/Markets/Table/Searchbar/Searchbar";
import { fuzzyFilter } from './../../components/Markets/Table/filters/fuzzyFilter';
import styles from '../../components/Markets/Table/Table/table.module.css';
import MarketSelect from "../../components/Markets/MarketSelect/MarketSelect";
import LoadingTable from "../../components/Loading/LoadingTable";
import HighlightedTokens from "../../components/Markets/Highlited/HighlightedTokens";
import { MarketData } from "../../components/Markets/interfaces/interfaces";

// Extending the filterFns interface of react-table to include a fuzzy filter function
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>  
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const MarketsPage: React.FC = () => {
  // Initializing state variables
  const [data, setData] = useState<MarketData[] | []>([]);
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [market, setMarket] = useState('spot');

  useEffect(() => {
    // Setting initial page size and fetching data using the getData function
    table.setPageSize(5);
  
    const fetchData = async (market : string) => {
      const data = await getData(market);
      setData(data);
    };
  
    fetchData(market);
    // Setting up an interval to fetch data
    const interval = setInterval(() => fetchData(market), 6000);

    // Clearing the interval when the component unmounts
    return () => clearInterval(interval);
  }, [market]);
  
  console.log(data)
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
      <h1 className="mt-2 mb-4">Market Overview</h1>
      <MarketSelect market={market} setMarket={setMarket} />
      <HighlightedTokens data={data} />
      <Searchbar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <div className="row">
        {data.length > 0 ?
          <>
            <div className='table-responsive'>
              <table className={`table text-light ${styles.table}`}>
                <Thead table={table} />
                <Tbody table={table} />
              </table>
              
            </div>
            <Pagination table={table} />  
          </>
          :
          <LoadingTable />  
        }
      </div>
      <div className="h-4" />
    </Layout>
  )
}

export default MarketsPage;