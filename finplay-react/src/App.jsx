import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/DashboardContent"; // New page component
// import Invoices from "./pages/Invoices";  // New page component
// // import Cards from "./pages/Cards";        // New page component
// import Wallets from "./pages/Wallets";    // New page component
// import Transactions from "./pages/Transactions"; // New page component

// Helper function to manage private routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = store.getState().auth.isAuthenticated; // Redux state for authentication
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public route (prevents logged-in users from accessing auth pages)
const PublicRoute = ({ children }) => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  return isAuthenticated ? <Navigate to="/" /> : children;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div style={{ display: "flex", height: "100vh" }}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Private Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <div style={{ display: "flex" }}>
                    <Sidebar />
                    <div style={{ marginLeft: "260px", width: "100%" }}>
                      <Header />
                      {/* <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="invoices" element={<Invoices />} />
                        <Route path="cards" element={<Cards />} />
                        <Route path="wallets" element={<Wallets />} />
                        <Route path="transactions" element={<Transactions />} />
                      </Routes> */}
                    </div>
                  </div>
                </PrivateRoute>
              }
            />

            {/* Redirect to login if no route matches */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
