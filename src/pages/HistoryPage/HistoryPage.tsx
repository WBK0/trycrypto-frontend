import { useState } from "react";
import Layout from "../../layout/Layout/Layout";
import Header from "./components/Header/Header";
import SelectInstrument from "./components/SelectInstrument/SelectInstrument";
import TableSpot from "./components/Table/trades/spot/TableSpot";
import { HeadingWrapper } from "./historyPage.styles";
import TableFutures from "./components/Table/trades/futures/TableFutures";
import { useParams } from "react-router-dom";
import TableSpotOrders from "./components/Table/orders/spot/TableSpot";
import TableFuturesOrders from "./components/Table/orders/futures/TableFutures";

const HistoryPage = () => {
  const [instrument, setInstrument] = useState<0 | 1>(0)
  
  const { type } = useParams();

  return(
    <Layout>
      <HeadingWrapper>
        <Header />
      </HeadingWrapper>
      <SelectInstrument instrument={instrument} setInstrument={setInstrument} />
      {
        type == 'trades'
        ?
          instrument == 0
          ? <TableSpot />
          : <TableFutures />
        :
          instrument == 0
          ? <TableSpotOrders />
          : <TableFuturesOrders />
      }
      
    </Layout>
  )
}

export default HistoryPage;