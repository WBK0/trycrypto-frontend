import { flexRender } from "@tanstack/react-table";
import { Key } from "react";
import styles from './table.module.css';

interface ITbody{
  table: any;
}

// Component responsible for rendering the table body
const Tbody: React.FC<ITbody> = ({ table }) => {
  return(
    <tbody>
      {table
        .getRowModel()
        .rows.slice()
        .map((row: { id: Key | null | undefined; getVisibleCells: () => any[]; }) => {
          return (
            <tr key={row.id} className={styles.row}>
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
            </tr>
          )
        })}
    </tbody>
  )
}

export default Tbody;