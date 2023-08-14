import axios from "axios";
import api from "./api";
import refreshAuthLogic from "axios-auth-refresh";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

// AuthApi component - refreshes the token when it expires
const AuthApi = () => {
  // Getting the setLoggedIn function from the AuthContext
  const auth = useContext(AuthContext);

  // refreshAuthLogicFn function - refreshes the token
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

  // Setting the refreshAuthLogic function
  refreshAuthLogic(api, refreshAuthLogicFn);

  return null;
}

export default AuthApi;