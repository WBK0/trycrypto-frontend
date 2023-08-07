import { ResponsiveTable, Table } from "../../marketPage.styles";
import Tbody from "./components/Tbody";
import Thead from "./components/Thead";

interface ITableMarket{
  table: any,
  market: string
}

const TableMarket : React.FC<ITableMarket> = ({ table, market }) => {
  return(
    <ResponsiveTable>
      <Table>
        <Thead table={table} />
        <Tbody table={table} market={market}/>
      </Table>
    </ResponsiveTable>
  )
}

export default TableMarket;