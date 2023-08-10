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

// History Page component - renders the history page
const HistoryPage = () => {

  // Get the type and instrument from the url
  const { type, instrument } = useParams();

  return(
    <Layout>
      <HeadingWrapper>
        <Header instrument={instrument}/>
      </HeadingWrapper>
      <SelectInstrument instrument={instrument} type={type} />
      {
        instrument == 'spot'
        ?
          type == 'trades'
          ? <TableSpot />
          : <TableSpotOrders />
        : instrument == 'futures' &&
          type == 'orders'
          ? <TableFutures />
          : <TableFuturesOrders />
      }
      
    </Layout>
  )
}

export default HistoryPage;