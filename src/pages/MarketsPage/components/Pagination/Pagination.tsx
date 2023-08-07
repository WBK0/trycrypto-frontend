import { RowData, Table } from '@tanstack/react-table';
import { DotsParagraph, PaginationButton, Wrapper } from './pagination.styles';

// Define interface
interface IPagination{
  table: Table<RowData>
}

// The component responsible for displaying the table pagination buttons
const Pagination : React.FC<IPagination> = ({table}) => {
  return(
    <Wrapper>
      {table.getState().pagination.pageIndex - 2 > 0 ?
        <PaginationButton 
          isActive={false} 
          onClick={() => table.setPageIndex(0)} 
        >1</PaginationButton>
        : null
      }
      {table.getState().pagination.pageIndex - 3 > 0 ?
        <DotsParagraph>
        ...
        </DotsParagraph>
        : null
      }
      {table.getState().pagination.pageIndex - 1 > 0 ?
        <PaginationButton 
          isActive={false} 
          onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 2)} 
        >{table.getState().pagination.pageIndex - 1}</PaginationButton>
        : null
      }
      {table.getState().pagination.pageIndex > 0 ?
        <PaginationButton 
          isActive={false} 
          onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)} 
        >{table.getState().pagination.pageIndex}</PaginationButton>
        : null
      }
      <PaginationButton 
        isActive={true} 
        onClick={() => table.setPageIndex(table.getState().pagination.pageIndex)} 
      >{table.getState().pagination.pageIndex + 1} </PaginationButton>
      {table.getState().pagination.pageIndex + 1 < table.getPageCount() ?
        <PaginationButton 
          isActive={false} 
          onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)} 
        >{table.getState().pagination.pageIndex + 2}</PaginationButton>
        : null
      }
      {table.getState().pagination.pageIndex + 3 < table.getPageCount() ?
        <PaginationButton  
          isActive={false} 
          onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 2)}
        >{table.getState().pagination.pageIndex + 3}</PaginationButton>
        : null
      }
      {table.getState().pagination.pageIndex + 5 <= table.getPageCount() ?
        <DotsParagraph>
        ...
        </DotsParagraph>
        : null
      }
      {table.getState().pagination.pageIndex + 3 <= table.getPageCount() ?
        <PaginationButton 
          isActive={false} 
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >{table.getPageCount()}</PaginationButton>
        : null
      }
    </Wrapper>
  )
}

export default Pagination;