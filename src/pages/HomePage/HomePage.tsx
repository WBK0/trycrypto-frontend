import { useEffect, useState } from 'react';
import Layout from '../../layout/Layout/Layout';
import { Col } from '../../shared/col';
import { Row } from '../../shared/row';
import AboutUs from './components/AboutUs/AboutUs';
import BuyCrypto from './components/BuyCrypto/BuyCrypto';
import Heading from './components/Heading/Heading';
import TopMovers from './components/OurSelection/OurSelection';
import { MarketData } from '../../components/Markets/interfaces/interfaces';
import getData from '../../components/Markets/services/getData';
import OurSelection from './components/OurSelection/OurSelection';

const HomePage: React.FC = () => {
  const [data, setData] = useState<MarketData[]>([])

  const fetchData = async () => {
   
      const result = await getData('spot')
      setData(result)
    
    
  }

  useEffect(() => {
    setInterval(async () => {
      fetchData()
    }, 10000)
    fetchData();
  }, [])

  return (
    <Layout>
      <Row alignItems='center'>
        <Col xs={100}>
          <Heading />
        </Col>
        <Col xs={100}>
          <AboutUs />
        </Col>
        <Col xs={100}>
          <OurSelection data={data} />
        </Col>
        <Col xs={100}>
          <BuyCrypto />
        </Col>
        
      </Row>
    </Layout>
  )
}

export default HomePage;