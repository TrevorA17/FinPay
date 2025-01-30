import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRouteLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check auth state

  // If already authenticated, redirect to dashboard (or any other private route)
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRouteLayout;
