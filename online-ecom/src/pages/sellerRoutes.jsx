import React from 'react';
import { Navigate } from 'react-router-dom';

const SellerRoutes = ({ children }) => {
  const isSeller = localStorage.getItem('access') === 'seller' ? true : false || null
  // If user is not logged in, redirect to login page
  console.log(isSeller)
  if(isSeller !=null){
      if (isSeller == false) {
        return <Navigate to="/Home" replace />;
      }
  }

  // If user is logged in, render the children (protected page)
  return children;
};

export default SellerRoutes;
