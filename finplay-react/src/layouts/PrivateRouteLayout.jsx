import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const PrivateRouteLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check auth state

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "260px", width: "100%" }}>
        <Header />
        <Outlet /> {/* Render the child routes */}
      </div>
    </div>
  );
};

export default PrivateRouteLayout;

