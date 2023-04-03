import { To } from "react-router-dom";
import { toast } from "react-toastify";
import api from "./api";

interface IHandleLogout {
  navigate: (to: To) => void;
  setLoggedIn: (value: boolean) => void;
}

const handleLogout = (navigate : IHandleLogout['navigate'], setLoggedIn : IHandleLogout['setLoggedIn'] ) => {
  api.get('/api/user/logout', {
    withCredentials: true
  })
  .then(() => {
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
    navigate("/");
  })
}

export default handleLogout;