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
import { columns } from './components/Table/columns/columns';
import Searchbar from "./components/Searchbar/Searchbar";
import { fuzzyFilter } from './components/Table/filters/fuzzyFilter';
import MarketSelect from "./components/MarketSelect/MarketSelect";
import LoadingTable from "../../components/Loading/LoadingTable";
import HighlightedTokens from "./components/HighlitedTokens/HighlightedTokens";
import { MarketHeader, TableWrapper } from "./marketPage.styles";
import TableMarket from "./components/Table/Table";
import useMarketData from "../../hooks/useMarketData";

// Extending the filterFns interface of react-table to include a fuzzy filter function
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>  
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

// MarketsPage component - the main component of the markets page
const MarketsPage: React.FC = () => {
  // Initializing state variables
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [market, setMarket] = useState('spot');

  // Fetching data using useMarketData hook
  const { data } = useMarketData(market)

  useEffect(() => {
    // Setting initial page size and fetching data using the getData function
    table.setPageSize(5);
  }, [market]);
  
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