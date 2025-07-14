import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token);

  // If token is not present, redirect to login (or register)
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
