import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

interface ILoginGuard {
  children: React.ReactNode;
}

const LoginGuard: React.FC<ILoginGuard> = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Navigate to="/" replace /> : <>{children}</>;
};

export default LoginGuard;