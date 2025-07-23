// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../../shared/utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
export { ProtectedRoute };
