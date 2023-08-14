import { toast } from "react-toastify";
import api from "./api";

// HandleLogout interface
interface IHandleLogout {
  setLoggedIn: (value: boolean) => void;
}

// handleLogout function - logout user
const handleLogout = ({ setLoggedIn } : IHandleLogout) => {
  // Make a request to logout endpoint
  api.get('/api/user/logout', {
    withCredentials: true
  })
  .then(() => {
    // If request is successful, set logged in to false
    toast.success('Successfully logout', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      });
    setLoggedIn(false);
  })
}

export default handleLogout;