import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('id'); // Assuming 'userId' is the key used for login check

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in, render the children (protected page)
  return children;
};

export default ProtectedRoute;
