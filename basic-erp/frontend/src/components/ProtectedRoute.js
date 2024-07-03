// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  if (roleRequired && userRole !== roleRequired) {
    // If role doesn't match, redirect to home or a 403 page
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
