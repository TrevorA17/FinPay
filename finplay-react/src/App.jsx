import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRouteLayout from "./layouts/PrivateRouteLayout";
import PublicRouteLayout from "./layouts/PublicRouteLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
const App = () => {
  return (
    <Routes>
      {/* Public Routes (Login, Register) */}
      <Route element={<PublicRouteLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Private Routes (Dashboard, etc.) */}
      <Route element={<PrivateRouteLayout />}>
        <Route path="/" element={<Sidebar />} />
        {/* Add more private routes here */}
      </Route>

      {/* Catch-all route to redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
