import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

interface IProtectedRoute {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? <Navigate to="/" replace /> : <>{children}</>;
};

export default ProtectedRoute;