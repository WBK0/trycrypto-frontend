import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  setLoggedIn: (value: boolean) => {}
});

export default AuthContext;