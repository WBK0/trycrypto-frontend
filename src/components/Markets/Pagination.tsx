interface IPagination{
  table: any
}

const Pagination : React.FC<IPagination> = ({table}) => {
  return(
    <>
    {table.getState().pagination.pageIndex - 2 > 0 ?
     <button
     className="border rounded p-1"
     onClick={() => table.setPageIndex(0)}
   >
     1
   </button>
    : 
    null
    }
    {table.getState().pagination.pageIndex - 1 > 0 ?
     <button
     className="border rounded p-1"
     onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 2)}
   >
     {table.getState().pagination.pageIndex - 1}
   </button>
    : 
    null
    }
    {table.getState().pagination.pageIndex > 0 ?
      <button
        className="border rounded p-1"
        onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)}
      >
      {table.getState().pagination.pageIndex}
      </button>
      : 
      null
    }    
    <button
      className="border rounded p-1"
      onClick={() => table.setPageIndex(table.getState().pagination.pageIndex)}
    >
      {table.getState().pagination.pageIndex + 1}
    </button>
    {table.getState().pagination.pageIndex + 1 < table.getPageCount()
    ?
      <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)}
        >
        {table.getState().pagination.pageIndex + 2}
      </button>
      : null
    }
    {table.getState().pagination.pageIndex + 2 < table.getPageCount()
    ?
      <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 2)}
        >
        {table.getState().pagination.pageIndex + 3}
      </button>
      : null
    }
        
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[1, 2, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
    </>
  )
}

export default Pagination;