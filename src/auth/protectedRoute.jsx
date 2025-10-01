import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './authUtils';

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
