import React from 'react';
import { Navigate } from 'react-router-dom';
import { isMemberAuthenticated } from './authUtils';

const ProtectedMemberRoute = ({ children }) => {
  return isMemberAuthenticated() ? children : <Navigate to="/" />;
};

export default ProtectedMemberRoute;
