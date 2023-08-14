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
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import PositionsPage from "./pages/PositionsPage/PositionsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PasswordResetPage from "./pages/PasswordResetPage/PasswordResetPage";
import { Tooltip } from "react-tooltip";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// App component - renders the app and its routes
function App() {
  // Getting the loading and setLastLocation functions from the AuthContext
  const { loading, setLastLocation } = useContext(AuthContext);
  // Getting the current location
  const location = useLocation();
  // Initialising states
  const [lastLocation, setAppLastLocation] = useState('/');

  // useEffect hook to set the last location when the location changes and the last location is not the same as the current location 
  useEffect(() => {
    if (location.pathname !== '/login' && lastLocation !== location.pathname && location.pathname !== '/password/reset') {
      setAppLastLocation(location.pathname);
      setLastLocation(location.pathname);
    }
  }, [location, lastLocation, setLastLocation]);

  // If the loading state is true, render the loading component otherwise render the routes 
  return (
    <>
      <Tooltip id="tooltip" style={{zIndex: '1000'}}/>
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
          <Route
            path="/signup"
            element={
              <LoginGuard>
                <RegisterPage />
              </LoginGuard>
            }
          />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/market/spot/:symbol" element={<SpotPage />} />
          <Route path="/market/futures/:symbol" element={<FuturesPage />} />
          <Route 
            path="/wallet" 
            element={
            <ProtectedRoute>
              <WalletPage />
            </ProtectedRoute>
            }  
          />
          <Route 
            path="/history/:instrument/:type" 
            element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
            } 
          />
          <Route 
            path="/positions/*" 
            element={
            <ProtectedRoute>
              <PositionsPage />  
            </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
            } 
          />
          <Route path="/password/reset" element={<PasswordResetPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;