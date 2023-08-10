import { Info, Loader, Loading, TBody, Td, Tr, Type } from "../../../table.styles";
import { IData } from "../TableSpot";

// Table Body interface
interface ITableBody{
  elementRef: React.RefObject<HTMLTableSectionElement>;
  data: IData[],
  loading: boolean;
  isAll: boolean;
}

// TableBody component - renders the table body
const TableBody: React.FC<ITableBody> = ({ elementRef, data, loading, isAll }) => {
  return(
    <TBody ref={elementRef}>
      {data && data.map((item) => {
        const date = new Date(item.date).toLocaleString();
        return(
          <Tr key={item.id}>
            <Type color={item.type == 'buy' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Type>
            <Td>{item.pair}</Td>
            <Td>{item.quantity} {item.pair.replace("USDT" , "")}</Td>
            <Td>{item.price} USDT</Td>
            <Td>{(item.quantity * item.price).toFixed(item.price >= 20 ? 4 : 2)} USDT</Td>
            <Td>{date}</Td>
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
            We dont find more history spot data
          </Info>
        </Tr>
        : data.length == 0 &&
        <Tr>
          <Info>
            Nothing found in the spot trade history
          </Info>
        </Tr>
      }
    </TBody>
  )
}

export default TableBody;