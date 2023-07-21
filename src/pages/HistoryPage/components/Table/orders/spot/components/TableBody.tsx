import { Info, Loader, Loading, StatusTd, TBody, Td, Tr, Type } from "../../../table.styles";
import { IData } from "../TableSpot";

interface ITableBody{
  elementRef: React.RefObject<HTMLTableSectionElement>;
  data: IData[],
  loading: boolean;
  isAll: boolean;
}

const TableBody: React.FC<ITableBody> = ({ elementRef, data, loading, isAll }) => {
  return(
    <TBody ref={elementRef}>
      {data && data.map((item) => {
        const startDate = new Date(item.startDate).toLocaleString();
        let endDate;
        if(item.endDate){
          endDate = new Date(item.endDate).toLocaleString();
        }

        console.log(endDate)

        return(
          <Tr key={item.id}>
            <StatusTd color={item.status}>
              {
                item.status == 'active' && <i className="bi bi-three-dots"></i> ||
                item.status == 'filled' && <i className="bi bi-check"></i> ||
                item.status == 'canceled' && <i className="bi bi-x"></i>
              }
            </StatusTd>
            <Type color={item.type == 'buy' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Type>
            <Td>{item.pair}</Td>
            <Td>{item.quantity} {item.pair.replace("USDT" , "")}</Td>
            <Td>{Number(item.price).toFixed(item.price <= 20 ? 4 : 2)} USDT</Td>
            <Td>{(item.quantity * item.price).toFixed(item.price <= 20 ? 4 : 2)} USDT</Td>
            <Td>{startDate}</Td>
            <Td>{endDate || 'Not closed yet'}</Td>
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
        isAll 
        ?
        <Tr>
          <Info>
            We dont find more history spot data
          </Info>
        </Tr>
        : null
      }
    </TBody>
  )
}

export default TableBody;