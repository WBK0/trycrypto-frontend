import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

// ILoginGuard interface
interface ILoginGuard {
  children: React.ReactNode;
}

// LoginGuard component - prevents logged in users from accessing the login page
const LoginGuard: React.FC<ILoginGuard> = ({ children }) => {
  // Getting the isLoggedIn state from the AuthContext
  const { isLoggedIn } = useContext(AuthContext);

  // If the user is logged in, redirect them to the home page
  return isLoggedIn ? <Navigate to="/" replace /> : <>{children}</>;
};

export default LoginGuard;