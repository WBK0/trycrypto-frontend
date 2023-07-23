import { Route, Routes, useParams } from "react-router-dom";
import PositionsLayout from "./Layout/Layout";
import Header from "./components/Header/Header";
import TableSpotOrders from "./components/TableSpotOrders/TableSpotOrders";
import { useEffect, useState } from "react";
import api from "../../services/api";

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

  return(
    <PositionsLayout>
      <Header params={params['*']!}/>
      <Routes>
        <Route path="/spot/orders" element={<TableSpotOrders prices={data['spot']} />} />
      </Routes>
    </PositionsLayout>
  )
}

export default PositionsPage;