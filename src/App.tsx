import { BrowserRouter, Route, Routes} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ToastContainer } from "react-toastify";
import LoginGuard from "./layout/Navbar/LoginGuard";
import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";
import Loading from "./components/Loading/Loading";
import ProtectedRoute from "./layout/Navbar/ProtectedRoute";

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
        </Routes>
        :
        <Loading />    
      }
       
    </BrowserRouter>  
  )
}

export default App;
