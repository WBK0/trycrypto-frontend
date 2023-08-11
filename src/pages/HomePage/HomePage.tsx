import Layout from '../../layout/Layout/Layout';
import AboutUs from './components/AboutUs/AboutUs';
import BuyCrypto from './components/BuyCrypto/BuyCrypto';
import Heading from './components/Heading/Heading';
import OurSelection from './components/OurSelection/OurSelection';
import Bar from './components/Bar/Bar';
import Faq from './components/Faq/Faq';
import useMarketData from '../../hooks/useMarketData';

// Home Page component
const HomePage: React.FC = () => {
  // Get data from the useMarketData hook
  const { data } = useMarketData('spot');

  // Rendering Home Page
  return (
    <Layout>
      <Heading />
      <AboutUs />
      <Bar />
      <OurSelection data={data} />
      <BuyCrypto />
      <Faq />
    </Layout>
  )
}

export default HomePage;