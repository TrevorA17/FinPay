import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

const PrivateRouteLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check auth state
  const authToken = localStorage.getItem("authToken");

  // If not authenticated, redirect to login page
  if (!isAuthenticated || !authToken) {
    return <Navigate to="/register" />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "260px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRouteLayout;
