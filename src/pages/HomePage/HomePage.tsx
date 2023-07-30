import Layout from '../../layout/Layout/Layout';
import { Col } from '../../shared/col';
import { Row } from '../../shared/row';
import AboutUs from './components/AboutUs/AboutUs';
import CryptoDataHeader from './components/AboutUs/AboutUs';
import Heading from './components/Heading/Heading';

const HomePage: React.FC = () => {

  return (
    <Layout>
      <Row alignItems='center'>
        <Col xs={100}>
          <Heading />
        </Col>
        <Col xs={50}>
        </Col>
        <Col xs={100}>
          <AboutUs />
        </Col>
      </Row>
    </Layout>
  )
}

export default HomePage;