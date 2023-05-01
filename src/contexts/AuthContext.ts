import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  loading: true,
  setLoggedIn: (value: boolean) => {},
  lastLocation: '/',
  setLastLocation: (value: string) => {}
});

export default AuthContext;