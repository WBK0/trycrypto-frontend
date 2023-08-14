import { useEffect, useState } from 'react';
import AuthContext from './contexts/AuthContext';
import AuthApi from './services/AuthApi';
import api from './services/api';

// AuthProvider interface
interface IAuthProvider {
  children: React.ReactNode;
}

// AuthProvider component - provides the AuthContext to the app
const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  // Initialising states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastLocation, setLastLocation] = useState<string>('/');

  // setLoggedIn function - sets the isLoggedIn state
  const setLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };

  // useEffect hook to check if the user is logged in
  useEffect(() => {
    api.get('/api/wallet/balance')
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, loading, lastLocation, setLastLocation }}>
      <AuthApi />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;