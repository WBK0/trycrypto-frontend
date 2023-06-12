import { useState } from "react";
import Layout from "../../layout/Layout/Layout";
import Header from "./components/Header/Header";
import SelectInstrument from "./components/SelectInstrument/SelectInstrument";
import TableSpot from "./components/Table/spot/TableSpot";
import { HeadingWrapper } from "./historyPage.styles";
import TableFutures from "./components/Table/futures/TableFutures";

const HistoryPage = () => {
  const [instrument, setInstrument] = useState<0 | 1>(0)
  
  return(
    <Layout>
      <HeadingWrapper>
        <Header />
        <SelectInstrument instrument={instrument} setInstrument={setInstrument} />
      </HeadingWrapper>
      {
        instrument == 0
        ? <TableSpot />
        : <TableFutures />
      }
      
    </Layout>
  )
}

export default HistoryPage;