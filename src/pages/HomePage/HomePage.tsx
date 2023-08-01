import Layout from '../../layout/Layout/Layout';
import { Col } from '../../shared/col';
import { Row } from '../../shared/row';
import AboutUs from './components/AboutUs/AboutUs';
import Heading from './components/Heading/Heading';
import TopMovers from './components/TopMovers/TopMovers';

const HomePage: React.FC = () => {

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
          <TopMovers />
        </Col>
      </Row>
    </Layout>
  )
}

export default HomePage;