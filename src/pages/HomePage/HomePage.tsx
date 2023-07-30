import Layout from '../../layout/Layout/Layout';
import { Col } from '../../shared/col';
import { Row } from '../../shared/row';
import CryptoDataHeader from './components/CryptoDataHeader/CryptoDataHeader';
import Heading from './components/Heading/Heading';
import HeadingTiles from './components/HeadingTiles/HeadingTiles';

const HomePage: React.FC = () => {

  return (
    <Layout>
      <Row alignItems='center' height='50vh'>
        <Col xs={45}>
          <Heading />
        </Col>
        <Col xs={55}>
          <HeadingTiles />
        </Col>
        <Col xs={100}>
          <CryptoDataHeader />
        </Col>
      </Row>
    </Layout>
  )
}

export default HomePage;