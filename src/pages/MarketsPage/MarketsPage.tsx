import { useEffect, useState } from "react";
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
import Layout from "../../layout/Layout/Layout";
import Pagination from "./components/Pagination/Pagination";
import Thead from "./components/Table/components/Thead";
import Tbody from "./components/Table/components/Tbody";
import { columns } from './components/Table/columns/columns';
import getData from "../../components/Markets/services/getData";
import Searchbar from "./components/Searchbar/Searchbar";
import { fuzzyFilter } from './components/Table/filters/fuzzyFilter';
import MarketSelect from "./components/MarketSelect/MarketSelect";
import LoadingTable from "../../components/Loading/LoadingTable";
import HighlightedTokens from "./components/HighlitedTokens/HighlightedTokens";
import { MarketData } from "./components/HighlitedTokens/interfaces/marketData";
import { Row } from "../../shared/row";
import { Col } from "../../shared/col";
import { MarketHeader, ResponsiveTable, Table, TableWrapper } from "./marketPage.styles";
import TableMarket from "./components/Table/Table";

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
  
    fetchData(market);
    // Setting up an interval to fetch data
    const interval = setInterval(() => fetchData(market), 6000);

    // Clearing the interval when the component unmounts
    return () => clearInterval(interval);
  }, [market]);

  const fetchData = async (market : string) => {
    const data = await getData(market);
    setData(data);
  };
  
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
      <MarketHeader>Market Overview</MarketHeader>
      <MarketSelect market={market} setMarket={setMarket} />
      <HighlightedTokens data={data} market={market} />
      <Searchbar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        {data.length > 0 ?
          <TableWrapper>
            <TableMarket table={table} market={market} />
            <Pagination table={table} />
          </TableWrapper>
          :
          <LoadingTable />  
        }
    </Layout>
  )
}

export default MarketsPage;