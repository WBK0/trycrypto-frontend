import Layout from "../../layout/Layout/Layout";
import CurrentBalance from "./components/CurrentBalance/CurrentBalance";
import UserInfo from "./components/UserInfo/UserInfo";

const WalletPage = () => {
  return(
    <Layout>
      <UserInfo />
      <CurrentBalance />
    </Layout>
  )
}

export default WalletPage;