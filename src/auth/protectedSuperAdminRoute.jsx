import React from 'react';
import { Navigate } from 'react-router-dom';
import { isSuperAdminAuthenticated } from './authUtils';

const protectedSuperAdminRoute = ({ children }) => {
  return isSuperAdminAuthenticated() ? children : <Navigate to="/" />;
};

export default protectedSuperAdminRoute;
