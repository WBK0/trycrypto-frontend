import { Route, Routes, useParams } from "react-router-dom";
import PositionsLayout from "./Layout/Layout";
import Header from "./components/Header/Header";
import TableSpotOrders from "./components/TableSpotOrders/TableSpotOrders";
import { useEffect, useState } from "react";
import api from "../../services/api";
import TableFuturesOrders from "./components/TableFuturesOrders/TableFuturesOrders";
import TableFuturesPositions from "./components/TableFuturesPositions/TableFuturesPositions";
import PathError from "./components/PathError/PathError";

const PositionsPage = () => {
  const [data, setData] = useState({spot: {}, futures: {}})
  const params = useParams()

  const getPrices = async () => {
    const response = await api.get('/data')
    setData(response.data)
  }

  useEffect(() => {
    getPrices();
    setInterval(() => {
      getPrices()
    }, 5000)
  }, [])

  console.log(params['*'])

  const isRouteMatched = (path: string) => {
    return params['*'] == path;
  };

  return(
    <PositionsLayout>
      {isRouteMatched("spot/orders") ||
      isRouteMatched("futures/orders") ||
      isRouteMatched("futures/positions") ? (
        <Header params={params['*']!} />
      ) : null}
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