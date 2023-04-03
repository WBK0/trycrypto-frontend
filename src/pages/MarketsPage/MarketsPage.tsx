import { useEffect, useReducer, useState } from "react";
import Layout from "../../layout/Layout/Layout";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Person = {
  pair: string
  price: number
  change: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    pair: 'tanner',
    price: 421.23,
    change: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    pair: 'tandy',
    price: 432.21312,
    change: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('pair', {
    cell: info => info.getValue(),
    header: () => <span>Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('price', {
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => <span>Price</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('change', {
    header: () => 'Price change',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: info => info.column.id,
  }),
]

const MarketsPage = () => {
  const [data, setData] = useState(() => [...defaultData])

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
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
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