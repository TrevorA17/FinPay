import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRouteLayout from "./layouts/PrivateRouteLayout";
import PublicRouteLayout from "./layouts/PublicRouteLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "./store/authSlice";

//Sidebar imports
import Dashboard from "./pages/DashboardContent";
import Invoices from "./pages/Invoices";
import Cards from "./pages/Cards";
import Wallets from "./pages/Wallets";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Beneficiaries from "./pages/Beneficiaries";
import Security from "./pages/Security";
import Identification from "./pages/Identification";
import ManageAccounts from "./components/ManageAccounts";
import NewPage from "./pages/NewPage";
const App = () => {
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL; // API URL from the .env

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const response = await axios.get(`${API_URL}/protected`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            // Token is valid; update Redux state
            dispatch(login(true));
          }
        } catch (err) {
          console.error("Token validation failed:", err.message);
          localStorage.removeItem("authToken"); // Clear invalid token
        }
      }
    };

    validateToken();
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes (Login, Register) */}
      <Route element={<PublicRouteLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newpage" element={<NewPage />} />
      </Route>

      {/* Private Routes (Sidebar with Dashboard, Invoices, etc.) */}
      <Route element={<PrivateRouteLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/security" element={<Security />} />
        <Route path="/identification" element={<Identification />} />
        <Route path="/accounts" element={<ManageAccounts />} />
      </Route>

      {/* Catch-all route to redirect to login if not matched */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
