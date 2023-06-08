import Layout from "../../layout/Layout/Layout";
import Header from "./components/Header/Header";
import SelectInstrument from "./components/SelectInstrument/SelectInstrument";
import TableSpot from "./components/Table/TableSpot";
import { HeadingWrapper } from "./historyPage.styles";

const HistoryPage = () => {
  return(
    <Layout>
      <HeadingWrapper>
        <Header />
        <SelectInstrument />
      </HeadingWrapper>
      <TableSpot />
    </Layout>
  )
}

export default HistoryPage;