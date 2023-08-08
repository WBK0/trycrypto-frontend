import { SubTd, SubTh, SubTr, TBody, THead, Table, Td, Tr } from "../../tableSpotOrders.styles";
import { IFuturesPositions } from "../TableFuturesPositions";

// Sub Table interface
interface ISubTable {
  item: IFuturesPositions;
}

// SubTable component - renders the sub table
const SubTable : React.FC<ISubTable> = ({ item }) => {
  return(
    <Tr>
      <Td colSpan={1} style={{padding: '0px'}}>
        <Table>
          <THead>
            <SubTr>
              <SubTh></SubTh>
            </SubTr>
          </THead>
          <TBody>
            <SubTr>
              <SubTd></SubTd>
            </SubTr>
          </TBody>
        </Table>
      </Td>
      <Td colSpan={7} style={{padding: '0px'}}>
        <Table>
          <THead>
            <SubTr>
              <SubTh>Leverage</SubTh>
              <SubTh>Take profit</SubTh>
              <SubTh>Stop loss</SubTh>
              <SubTh>Liquidation</SubTh>
            </SubTr>
          </THead>
          <TBody>
            <SubTr>
              <SubTd width="150px">{item.leverage}</SubTd>
              <SubTd width="150px">{item.takeProfit || 0} USDT</SubTd>
              <SubTd width="150px">{item.stopLoss || 0} USDT</SubTd>
              <SubTd width="150px">{Number(item.liquidationPrice).toFixed(4)} USDT</SubTd>
            </SubTr>
          </TBody>
        </Table>
      </Td>
    </Tr>
  )
}

export default SubTable;