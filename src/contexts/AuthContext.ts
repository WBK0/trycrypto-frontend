import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  loading: true,
  setLoggedIn: (value: boolean) => {}
});

export default AuthContext;