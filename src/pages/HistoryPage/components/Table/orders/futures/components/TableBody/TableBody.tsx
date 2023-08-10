import { Ref } from "react";
import { DateTd, Info, Leverage, Loader, Loading, Pair, StatusTd, TBody, Td, Tr, Type } from "../../../../table.styles";
import { IData } from "../../TableFutures";

// TableBody interface
interface ITableBody {
  tableBodyRef: Ref<HTMLTableSectionElement>;
  data: IData[];
  loading: boolean;
  isAll: boolean;
}

// TableBody component - renders the table body
const TableBody : React.FC<ITableBody> = ({ tableBodyRef, data, loading, isAll }) => {
  return(
    <TBody ref={tableBodyRef}>
      {data && data.map((item) => {
        const startDate = new Date(item.startDate).toLocaleString();
        let endDate;
        if(item.endDate){
          endDate = new Date(item.endDate).toLocaleString();
        }
        return(
          <Tr key={item.id}>
            <StatusTd color={item.status}>
              {
                item.status == 'active' && <i className="bi bi-three-dots"></i> ||
                item.status == 'filled' && <i className="bi bi-check"></i> ||
                item.status == 'canceled' && <i className="bi bi-x"></i>
              }
            </StatusTd>
            <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Type>
            <Pair>{item.pair}</Pair>
            <Td>{item.quantity}</Td>
            <Td>{item.price}</Td>
            <Leverage>{item.leverage}X</Leverage>
            <Td>{item.takeProfit || 0}</Td>
            <Td>{item.stopLoss || 0}</Td>
            <DateTd>{startDate}</DateTd>
            <DateTd>{endDate || 'Not closed yet'}</DateTd>
          </Tr>
        )
      })} 
      {loading && !isAll
      ? 
      <Tr>
        <Loading>
          <Loader />
        </Loading>
      </Tr>
      : null
      }
      {
        isAll && data.length > 0
        ?
        <Tr>
          <Info>
            We dont find more history futures orders data
          </Info>
        </Tr>
        : data.length == 0 &&
        <Tr>
          <Info>
            Nothing found in the futures orders history
          </Info>
        </Tr>
      }
    </TBody>
  )
}

export default TableBody;