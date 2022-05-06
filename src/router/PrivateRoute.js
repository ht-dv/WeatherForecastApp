import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (!(email || password)) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
