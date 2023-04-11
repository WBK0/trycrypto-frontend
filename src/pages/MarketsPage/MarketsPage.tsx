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
import styles from '../../components/Markets/Table/Table/table.module.css';import Loading from "../../components/Loading/Loading";
import MarketSelect from "../../components/Markets/Table/MarketSelect/MarketSelect";
import LoadingTable from "../../components/Loading/LoadingTable";

// Extending the filterFns interface of react-table to include a fuzzy filter function
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>  
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

interface MarketData {
  pair: string;
  volume: string;
  openPrice: string;
  lastPrice: string;
  highPrice: string;
  lowPrice: string;
  percentChange: string;
  priceChange: string;
}

const MarketsPage: React.FC = () => {
  // Initializing state variables
  const [data, setData] = useState<MarketData[] | []>([]);
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [market, setMarket] = useState('spot');

  useEffect(() => {
    setData([])
    // Setting initial page size and fetching data using the getData function
    table.setPageSize(5);
  
    const fetchData = async (market : string) => {
      const data = await getData(market);
      setData(data);
    };
  
    fetchData(market);
  
    // Setting up an interval to fetch data
    const interval = setInterval(fetchData, 6000);

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
  
  const randomIndex = Math.floor(Math.random() * data.length);
  const shiftedData = data.slice(randomIndex).concat(data.slice(0, randomIndex));  
  const selectedData = shiftedData.slice(0, 3);
  // Rendering the MarketsPage
  return(
    <Layout>
      <h1 className="mt-2 mb-4">Market Overview</h1>
      <MarketSelect market={market} setMarket={setMarket} />
      <div className="row mt-3">
      {data.length > 0 ?
        <>
          <div className="col-3">
            <div className={styles.highlitedContainer}>
              <p className={styles.header}>Highest volume</p>
              {data.sort((a: any, b: any) => b.volume - a.volume).slice(0,3).map((item) => (
                <div key={item.pair} className={styles.container}>
                  <div className={styles.left}>
                    <img src={"https://api.trycrypto.pl/icon/" + item.pair.replace(/usdt/gi, "").toLowerCase()} alt="Crypto icon" className="me-1"/> 
                      {item.pair.replace(/usdt/gi, "")}
                  </div>
                  <div className={styles.center}>
                    {Number(item.lastPrice).toFixed(2)}
                  </div>
                  <div className={styles.right}>
                    {Number(item.percentChange).toFixed(2) + "%"}
                  </div>
                </div>
              ))} 
            </div>
          </div>
          <div className="col-3">
            <div className={styles.highlitedContainer}>
              <p className={styles.header}>Highest prices</p>
              {data.sort((a: any, b: any) => a.lastPrice - b.lastPrice).slice(0, 3).map((item) => (
                <div key={item.pair} className={styles.container}>
                <div className={styles.left}>
                  <img src={"https://api.trycrypto.pl/icon/" + item.pair.replace(/usdt/gi, "").toLowerCase()} alt="Crypto icon" className="me-1"/> 
                    {item.pair.replace(/usdt/gi, "")}
                </div>
                <div className={styles.center}>
                  {Number(item.lastPrice).toFixed(2)}
                </div>
                <div className={styles.right}>
                  {Number(item.percentChange).toFixed(2) + "%"}
                </div>
              </div>
              ))}
            </div>
          </div>
          <div className="col-3">
            <div className={styles.highlitedContainer}>
              <p className={styles.header}>Highest changes</p>
              {data.sort((a: any, b: any) => b.percentChange - a.percentChange).slice(0, 3).map((item) => (
                <div key={item.pair} className={styles.container}>
                <div className={styles.left}>
                  <img src={"https://api.trycrypto.pl/icon/" + item.pair.replace(/usdt/gi, "").toLowerCase()} alt="Crypto icon" className="me-1"/> 
                    {item.pair.replace(/usdt/gi, "")}
                </div>
                <div className={styles.center}>
                  {Number(item.lastPrice).toFixed(2)}
                </div>
                <div className={styles.right}>
                  {Number(item.percentChange).toFixed(2) + "%"}
                </div>
              </div>
              ))}
            </div>
          </div>
          <div className="col-3">
            <div className={styles.highlitedContainer}>
              <p className={styles.header}>Random cryptocurrencies</p>
              {selectedData.map((item) => (
                <div key={item.pair} className={styles.container}>
                <div className={styles.left}>
                  <img src={"https://api.trycrypto.pl/icon/" + item.pair.replace(/usdt/gi, "").toLowerCase()} alt="Crypto icon" className="me-1"/> 
                    {item.pair.replace(/usdt/gi, "")}
                </div>
                <div className={styles.center}>
                  {Number(item.lastPrice).toFixed(2)}
                </div>
                <div className={styles.right}>
                  {Number(item.percentChange).toFixed(2) + "%"}
                </div>
              </div>
              ))}
            </div>
          </div>
        </>
        : null
      }
      </div>
      <Searchbar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <div className="row">
        {data.length > 0 ?
          <div className='table-responsive'>
            <table className={`table text-light ${styles.table}`}>
              <Thead table={table} />
              <Tbody table={table} />
            </table>   
          </div>
          :
          <LoadingTable />  
        }

      </div>
      
      <Pagination table={table} />
      <div className="h-4" />
    </Layout>
  )
}

export default MarketsPage;