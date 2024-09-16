import React from 'react';
import { Navigate } from 'react-router-dom';

// RedirectToDashboard component
const RedirectToHome = ({ children }) => {
  const token = localStorage.getItem("token");

  // If the user is logged in, redirect to the dashboard
  if (token) {
    return <Navigate to="/" replace />;
  }

  // If no token, allow access to the page (sign-in or sign-up)
  return children;
};

export default RedirectToHome;