import { useEffect, useMemo, useState } from "react";
import styles from "./markets.module.css";
import Layout from "../../layout/Layout/Layout";
import api from './../../services/api';
import Pagination from "../../components/Markets/Pagination";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/react-table'
import {
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>  
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type Cryptocurrencies = {
  pair: string;
  lastPrice: number;
  percentChange: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const MarketsPage = () => {
  const [data, setData] = useState(() => [])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<Cryptocurrencies>[]>(
    () => [
      { 
        accessorKey: "pair",
        cell: (info : any) => info.getValue(),
        header: () => <span>Name</span>,
        filterFn: 'fuzzy',  
      },
      {
        accessorKey: 'lastPrice',
        id: 'lastPrice',
        cell: (info : any) => {
          const value = parseFloat(info.getValue());
          return value > 1 ? value.toFixed(2) : value.toFixed(4);
        },
        sortingFn: 'alphanumeric',
        header: () => <span>Price</span>,
        enableGlobalFilter: false
      },
      {
        accessorKey: 'percentChange',
        header: () => 'Price change',
        id: 'percentChange',
        cell: (info : any) => {
          const value = parseFloat(info.getValue());
          return <span>{value.toFixed(2) + "%"}</span>;
        },
        sortingFn: (a: any, b: any, desc: any) => {
          const numA = parseFloat(a.getValue('percentChange'));
          const numB = parseFloat(b.getValue('percentChange'));
          if (numA < numB) {
            return desc ? -1 : 1;
          }
          if (numA > numB) {
            return desc ? 1 : -1;
          }
          return 0;
        },
        enableGlobalFilter: false
      },
      {
        accessorKey: 'highPrice',
        header: () => <span>24h High</span>,
        cell: (info : any) => {
          const value = parseFloat(info.getValue());
          return value > 1 ? value.toFixed(2) : value.toFixed(4);
        },
        sortingFn: 'alphanumeric',
        enableGlobalFilter: false
      },
      {
        accessorKey: 'lowPrice',
        header: '24h Low',
        cell: (info : any) => {
          const value = parseFloat(info.getValue());
          return value > 1 ? value.toFixed(2) : value.toFixed(4);
        },
        enableGlobalFilter: false
      },
      {
        accessorKey: 'volume',
        header: '24h Volume',
        cell: (info : any) => {
          const value = parseFloat(info.getValue());
          return (value / 1000000).toFixed(2) + "M";
        },
        sortingFn: 'alphanumeric',
        enableGlobalFilter: false
      }
  ], [])

  useEffect(() => {
    table.setPageSize(1)
    api.get("/data")
    .then((response) => {
      const res = response.data.spot;
      let res2: any = []
      res2 = Object.keys(res).map(key => res[key]);  
      setData(res2) 
    })
  },[])
 
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
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getPaginationRowModel: getPaginationRowModel(),
  })

  return(
    <Layout>
      <div className="p-2">
        <input value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(String(e.target.value))}/>
      <table className={`table text-light`}>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={styles.table}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <i className="bi bi-arrow-up" style={{marginLeft: "5px", fontSize: "12px"}}></i>,
                          desc: <i className="bi bi-arrow-down" style={{marginLeft: "5px", fontSize: "12px"}}></i>,
                          false: <i className="bi bi-arrow-down-up" style={{marginLeft: "5px", fontSize: "12px"}}></i>,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
        {table
            .getRowModel()
            .rows.slice(0, 10)
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <Pagination table={table} />
      <div className="h-4" />
    </div>
    </Layout>
  )
}

export default MarketsPage;