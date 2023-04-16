import { useEffect, useState } from 'react';
import AuthContext from './contexts/AuthContext';
import AuthApi from './services/AuthApi';
import api from './services/api';

interface IAuthProvider{
  children: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const setLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };

  // checking if the user is logged in
  useEffect(() => {
    api.get('/api/wallet/balance')
    .then((response) => {
      if(response.status == 200){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, loading }}>
      <AuthApi />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;