
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout";
import DashboardContent from "./pages/DashboardContent";
import Invoices from "./pages/Invoices";
import Cards from "./pages/Cards";
import Wallets from "./pages/Wallets";
import Transactions from "./pages/Transactions";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="cards" element={<Cards />} />
          <Route path="wallets" element={<Wallets />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
