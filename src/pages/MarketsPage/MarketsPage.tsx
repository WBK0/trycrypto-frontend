import { useEffect, useState } from "react";
import Layout from "../../layout/Layout/Layout";
import api from './../../services/api';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Person = {
  pair: string
  lastPrice: string
  percentChange: string
  highPrice: string
  lowPrice: string
  volume: string
}

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('pair', {
    cell: info => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('lastPrice', {
    id: 'lastName',
    cell: info => {
      const value = parseFloat(info.getValue());
      return value > 1 ? value.toFixed(2) : value.toFixed(4);
    },
    header: () => <span>Price</span>,
  }),
  columnHelper.accessor('percentChange', {
    header: () => 'Price change',
    cell: info => {
      const value = parseFloat(info.getValue());
      return value.toFixed(2) + "%";
    },
  }),
  columnHelper.accessor('highPrice', {
    header: () => <span>24h High</span>,
    cell: info => {
      const value = parseFloat(info.getValue());
      return value > 1 ? value.toFixed(2) : value.toFixed(4);
    },
  }),
  columnHelper.accessor('lowPrice', {
    header: '24h Low',
    cell: info => {
      const value = parseFloat(info.getValue());
      return value > 1 ? value.toFixed(2) : value.toFixed(4);
    },
  }),
  columnHelper.accessor('volume', {
    header: '24h Volume',
    cell: info => {
      const value = parseFloat(info.getValue());
      return (value / 1000000).toFixed(2) + "M";
    },
  }),
]

const MarketsPage = () => {
  const [data, setData] = useState(() => [])

  useEffect(() => {
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
    getCoreRowModel: getCoreRowModel(),
  })

  return(
    <Layout>
      <div className="p-2">
      <table className="table text-light">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              <th>Name</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>24h High</th>
              <th>24h Low</th>
              <th>24h Volume</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
    </Layout>
  )
}

export default MarketsPage;