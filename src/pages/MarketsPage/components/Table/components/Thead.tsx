import { flexRender } from "@tanstack/react-table";
import styles from './table.module.css';
import { HeaderRow } from "./table.styles";

interface IThead{
  table: any;
}

interface IHeader {
  id: string;
  column: any;
  getCanSort: () => boolean;
  getToggleSortingHandler: () => () => void;
  isPlaceholder: boolean;
  getContext: () => any;
  colSpan: number;
  getSize: () => number;
}

interface IHeaderGroup {
  id: string;
  headers: IHeader[];
}

// Thead component that renders the table header
const Thead : React.FC<IThead> = ({ table }) => {
  
  // Get the table header groups and map over them
  return(
    <thead>
      {table.getHeaderGroups().map((headerGroup : IHeaderGroup) => (
        // Render a row for each header group
        <HeaderRow key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            // Render a cell for each header in the group
            return (
              <th key={header.id} colSpan={header.colSpan} style={{minWidth: header.getSize() + "px"}}> 
                {header.isPlaceholder ? null : (
                  <div
                    className = 'cursor-pointer select-none'
                    onClick = {header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {/* Render an arrow icon based on the current sorting direction */}
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
        </HeaderRow>
      ))}
    </thead>
  )
}

export default Thead;