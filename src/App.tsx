import { BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ToastContainer } from "react-toastify";
import LoginGuard from "./routes/LoginGuard";
import { useContext, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import Loading from "./components/Loading/Loading";
import MarketsPage from "./pages/MarketsPage/MarketsPage";
import SpotPage from "./pages/TradingPages/SpotPage/SpotPage";

function App() {
  const { loading, lastLocation, setLastLocation } = useContext(AuthContext);
  const location = useLocation();
  if (location.pathname !== '/login' && lastLocation !== location.pathname) {
    setLastLocation(location.pathname);
  }
  return (
    <>
      <ToastContainer />
      {!loading ?
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={
            <LoginGuard>
              <LoginPage />
            </LoginGuard>
          } />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/market/spot/:symbol" element={<SpotPage />} />
        </Routes>
        :
        <Loading />    
      }
    </>  
  )
}

export default App;
