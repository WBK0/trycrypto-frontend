import { useEffect, useState } from "react";
import useWallet from "../../hooks/useWallet";
import Layout from "../../layout/Layout/Layout";
import { Col } from "../../shared/col";
import { Row } from "../../shared/row";
import BalanceChart from "./components/BalanceChart/BalanceChart";
import CryptoAssets from "./components/CryptoAssets/CryptoAssets";
import CurrentBalance from "./components/CurrentBalance/CurrentBalance";
import UserInfo from "./components/UserInfo/UserInfo";
import Loading from "../../components/Loading/Loading";

// WalletPage component - the main component of the wallet page
const WalletPage = () => {
  // Initializing state variables
  const [loading, setLoading] = useState(true)

  // Fetching data using useWallet hook
  const { balance } = useWallet();

  // Setting loading to false when balance is fetched
  useEffect(() => {
    if(balance){
      setLoading(false)
      console.log(balance)
    }
  }, [balance])

  return(
    <>
    {loading // Rendering loading component if loading is true
      ? <Loading withNavbar={true} />
      : null
    }
      <Layout>
        <UserInfo />
        <CurrentBalance balance={balance?.currentBalance}/>
        <BalanceChart />
        <Row mt="25px" pb="150px">
          <Col xs={100} md={33.33} pr="0px" pl="0px" prMd="12px">
            <CryptoAssets 
              instrument="spot"
              balance={balance}
            />
          </Col>
          <Col xs={100} md={33.33} pr="0px" pl="0px" prMd="6px" plMd="6px">
            <CryptoAssets 
              instrument="futures"
              type="long"
              balance={balance}
            />
          </Col>
          <Col xs={100} md={33.33} pr="0px" pl="0px" plMd="12px">
            <CryptoAssets 
              instrument="futures" 
              type="short"
              balance={balance}
            />  
          </Col>
        </Row>
      </Layout> 
    </>
  )
}

export default WalletPage;