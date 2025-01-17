import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRouteLayout from "./layouts/PrivateRouteLayout";
import PublicRouteLayout from "./layouts/PublicRouteLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/DashboardContent";      
import Invoices from "./pages/Invoices";      
import Cards from "./pages/Cards";            
import Wallets from "./pages/Wallets";        
import Transactions from "./pages/Transactions"; 

const App = () => {
  return (
    <Routes>
      {/* Public Routes (Login, Register) */}
      <Route element={<PublicRouteLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Private Routes (Sidebar with Dashboard, Invoices, etc.) */}
      <Route element={<PrivateRouteLayout />}>
        <Route path="/" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>

      {/* Catch-all route to redirect to login if not matched */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
