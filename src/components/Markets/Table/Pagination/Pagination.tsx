import { RowData, Table } from '@tanstack/react-table';
import Button from './Button';
import styles from './pagination.module.css'

// Define interface
interface IPagination{
  table: Table<RowData>
}

// The component responsible for displaying the table pagination buttons
const Pagination : React.FC<IPagination> = ({table}) => {
  return(
    <div className={styles.container}>
      <ul className="pagination">
        {table.getState().pagination.pageIndex - 2 > 0 ?
          <Button 
            table={table} 
            isActive={false} 
            value={1} 
            action={() => table.setPageIndex(0)} 
          />
          : null
        }
        {table.getState().pagination.pageIndex - 1 > 0 ?
          <Button 
            table={table} 
            isActive={false} 
            value={table.getState().pagination.pageIndex - 1} 
            action={() => table.setPageIndex(table.getState().pagination.pageIndex - 2)} 
          />
          : null
        }
        {table.getState().pagination.pageIndex > 0 ?
          <Button 
            table={table} 
            isActive={false} 
            value={table.getState().pagination.pageIndex} 
            action={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)} 
          />
          : null
        }
        <Button 
          table={table} 
          isActive={true} 
          value={table.getState().pagination.pageIndex + 1} 
          action={() => table.setPageIndex(table.getState().pagination.pageIndex)} 
        />
        {table.getState().pagination.pageIndex + 1 < table.getPageCount() ?
          <Button 
            table={table} 
            isActive={false} 
            value={table.getState().pagination.pageIndex + 2}
            action={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)} 
          />
          : null
        }
        {table.getState().pagination.pageIndex + 3 < table.getPageCount() ?
          <Button 
            table={table} 
            isActive={false} 
            value={table.getState().pagination.pageIndex + 3}
            action={() => table.setPageIndex(table.getState().pagination.pageIndex + 2)}
          />
          : null
        }
        {table.getState().pagination.pageIndex + 3 <= table.getPageCount() ?
          <Button 
            table={table} 
            isActive={false} 
            value={table.getPageCount()}
            action={() => table.setPageIndex(table.getPageCount() - 1)}
          />
          : null
        }
      </ul> 
    </div>
  )
}

export default Pagination;