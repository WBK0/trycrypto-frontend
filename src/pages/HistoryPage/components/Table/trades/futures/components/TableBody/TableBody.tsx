import { Ref } from "react";
import { DateTd, Info, Leverage, Loader, Loading, Pair, Pnl, PnlText, TBody, Td, Tr, Type } from "../../../../table.styles";
import { IData } from "../../TableFutures";

// Table Body interface
interface ITableBody {
  tableBodyRef: Ref<HTMLTableSectionElement>;
  data: IData[];
  loading: boolean;
  isAll: boolean;
}

// TableBody component - renders the table body
const TableBody : React.FC<ITableBody> = ({ tableBodyRef, data, loading, isAll}) => {
  return(
    <TBody ref={tableBodyRef}>  
      {data && data.map((item) => {
        const date = new Date(item.date).toLocaleString();
        const pnlAmount = Number(item.type == 'LONG' ? (item.quantitySold * item.sellingPrice - item.quantitySold * item.purchasePrice) * item.leverage : (item.quantitySold * item.purchasePrice - item.quantitySold * item.sellingPrice) * item.leverage).toFixed(2)
        const pnlPercent = item.type == 'LONG' ? ((item.sellingPrice / item.purchasePrice * 100 - 100) * item.leverage).toFixed(2) : -((item.sellingPrice / item.purchasePrice * 100 - 100) * item.leverage ).toFixed(2)
        
        return(
          <Tr key={item.id}>
            <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Type>
            <Pair>{item.pair}</Pair>
            <Td>{item.quantityPosition}</Td>
            <Td>{item.quantitySold}</Td>
            <Leverage>{item.leverage}X</Leverage>
            <Td>{Number(item.purchasePrice).toFixed(item.purchasePrice < 30 ? 4 : 2)} USDT</Td>
            <Td>{Number(item.sellingPrice).toFixed(item.sellingPrice < 30 ? 4 : 2)} USDT</Td>
            <Pnl color={item.purchasePrice <= item.sellingPrice ? item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)' : item.type == 'SHORT' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>
              <PnlText>{pnlAmount}$</PnlText>
              <PnlText>{pnlPercent}%</PnlText>
            </Pnl>
            <DateTd>{date}</DateTd>
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
            We dont find more history futures data
          </Info>
        </Tr>
        : data.length == 0 &&
        <Tr>
          <Info>
            Nothing found in the futures trade history
          </Info>
        </Tr>
      }
    </TBody>
  )
}

export default TableBody;