import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  loading: true,
  setLoggedIn: (value: boolean) => {}
});

export default AuthContext;