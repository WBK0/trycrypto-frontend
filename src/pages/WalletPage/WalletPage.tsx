import Layout from "../../layout/Layout/Layout";
import BalanceChart from "./components/BalanceChart/BalanceChart";
import CurrentBalance from "./components/CurrentBalance/CurrentBalance";
import UserInfo from "./components/UserInfo/UserInfo";

const WalletPage = () => {
  return(
    <Layout>
      <UserInfo />
      <CurrentBalance />
      <BalanceChart />
    </Layout>
  )
}

export default WalletPage;