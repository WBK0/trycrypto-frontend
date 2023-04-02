import { useContext, useEffect } from 'react';
import Layout from '../../layout/Layout/Layout';
import api from '../../services/api';
import AuthContext from '../../contexts/AuthContext';

const HomePage: React.FC = () => {

  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    api.get("https://api.trycrypto.pl/api/wallet/balance", {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response)
    })
    console.log(isLoggedIn)
  }, [])

  return (
    <Layout>
      Home component
    </Layout>
  )
}

export default HomePage;