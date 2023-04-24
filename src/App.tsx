import { BrowserRouter, Route, Routes} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ToastContainer } from "react-toastify";
import LoginGuard from "./routes/LoginGuard";
import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";
import Loading from "./components/Loading/Loading";
import MarketsPage from "./pages/MarketsPage/MarketsPage";
import SpotPage from "./pages/TradingPages/SpotPage/SpotPage";

function App() {
  const { loading } = useContext(AuthContext);
  return (
    <BrowserRouter>
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
       
    </BrowserRouter>  
  )
}

export default App;
