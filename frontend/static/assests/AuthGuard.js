import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ component: Component }) => {
  const token = localStorage.getItem('token');
  

  const isAuthenticated = token && token !== '';

  return isAuthenticated ? <Component /> : <Navigate to="/signin" />;
};

export default AuthGuard;
