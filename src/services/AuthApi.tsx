import axios from "axios";
import api from "./api";
import refreshAuthLogic from "axios-auth-refresh";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const AuthApi = () => {
  const auth = useContext(AuthContext);

  const refreshAuthLogicFn = () => 
    axios
      .get("https://api.trycrypto.pl/user/refresh/token",
      {
        withCredentials: true
      })
      .then(() => {
        return Promise.resolve();
      })
      .catch(() => {
        auth.setLoggedIn(false)
      });

  refreshAuthLogic(api, refreshAuthLogicFn);

  return null;
}

export default AuthApi;