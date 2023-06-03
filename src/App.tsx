import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ToastContainer } from "react-toastify";
import LoginGuard from "./routes/LoginGuard";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import Loading from "./components/Loading/Loading";
import MarketsPage from "./pages/MarketsPage/MarketsPage";
import SpotPage from "./pages/TradingPages/SpotPage/SpotPage";
import FuturesPage from "./pages/TradingPages/FuturesPage/FuturesPage";
import WalletPage from "./pages/WalletPage/WalletPage";

function App() {
  const { loading, setLastLocation } = useContext(AuthContext);
  const location = useLocation();
  const [lastLocation, setAppLastLocation] = useState('/');

  useEffect(() => {
    if (location.pathname !== '/login' && lastLocation !== location.pathname) {
      setAppLastLocation(location.pathname);
      setLastLocation(location.pathname);
    }
  }, [location, lastLocation, setLastLocation]);

  return (
    <>
      <ToastContainer />
      {!loading ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <LoginGuard>
                <LoginPage />
              </LoginGuard>
            }
          />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/market/spot/:symbol" element={<SpotPage />} />
          <Route path="/market/futures/:symbol" element={<FuturesPage />} />
          <Route path="/wallet" element={<WalletPage />} />
        </Routes>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;