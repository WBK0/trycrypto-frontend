import { Route, Routes, useParams } from "react-router-dom";
import PositionsLayout from "./Layout/Layout";
import Header from "./components/Header/Header";
import TableSpotOrders from "./components/TableSpotOrders/TableSpotOrders";
import { useEffect, useState } from "react";
import api from "../../services/api";
import TableFuturesOrders from "./components/TableFuturesOrders/TableFuturesOrders";
import TableFuturesPositions from "./components/TableFuturesPositions/TableFuturesPositions";
import PathError from "./components/PathError/PathError";

// PositionsPage component - renders the positions page
const PositionsPage = () => {
  // Initialising the state
  const [data, setData] = useState({spot: {}, futures: {}});
  // Getting the params from the url
  const params = useParams();

  // Function to get the prices from the api
  const getPrices = async () => {
    const response = await api.get('/data')
    setData(response.data)
  }

  // Fetching the prices on component mount and setting an interval to fetch the prices every 5 seconds
  useEffect(() => {
    getPrices();
    setInterval(() => {
      getPrices()
    }, 5000)
  }, [])

  // Function to check if the route is matched
  const isRouteMatched = (path: string) => {
    return params['*'] == path;
  };

  return(
    <PositionsLayout>
      { // Rendering the header if the route is matched with the following paths
        isRouteMatched("spot/orders") ||
        isRouteMatched("futures/orders") ||
        isRouteMatched("futures/positions") 
      ? (
        <Header params={params['*']!} />
      ) 
      : null
      }
      <Routes>
        <Route path="/spot/orders" element={<TableSpotOrders prices={data['spot']} />} />
        <Route path="/futures/orders" element={<TableFuturesOrders prices={data['futures']} />} />
        <Route path="/futures/positions" element={<TableFuturesPositions prices={data['futures']} />} />
        <Route path="*" element={<PathError />} />
      </Routes>
    </PositionsLayout>
  )
}

export default PositionsPage;