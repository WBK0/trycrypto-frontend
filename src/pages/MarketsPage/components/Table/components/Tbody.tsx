import { flexRender } from "@tanstack/react-table";
import { Key } from "react";
import { TableRow } from "./table.styles";
import { useNavigate } from "react-router-dom";

interface ITbody{
  table: any;
  market: string;
}

// Component responsible for rendering the table body
const Tbody: React.FC<ITbody> = ({ table, market }) => {
  const navigate = useNavigate()

  const handleNavigate = (row : {original: {pair: string}}) =>{
    navigate('/market/' + market + "/" + row.original.pair.toLowerCase())
  }

  return(
    <tbody>
      {table
        .getRowModel()
        .rows.slice()
        .map((row: { id: Key | null | undefined; original: {pair: string}, getVisibleCells: () => any[]; }) => {
          return (
            <TableRow key={row.id} onClick={() => handleNavigate(row)}>
              {/* Render the visible cells for the current row */}
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
            </TableRow>
          )
        })}
    </tbody>
  )
}

export default Tbody;