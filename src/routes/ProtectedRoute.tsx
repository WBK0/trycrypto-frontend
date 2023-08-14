import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { toast } from 'react-toastify';

// IProtectedRoute interface
interface IProtectedRoute {
  children: React.ReactNode;
}

// ProtectedRoute component - protects the routes from unauthorised users
const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  // If the user is not logged in, display a toast notification
  if(!isLoggedIn){
    toast.error('You must be logged in to view this page', {
      toastId: 'protected-route',
      autoClose: 5000,
      position: 'bottom-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark'
    })
  }
 

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;