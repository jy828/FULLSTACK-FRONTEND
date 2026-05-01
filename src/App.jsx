import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import CityServices from "./components/CityServices";
import Profile from "./components/Profile";
import CitizenDashboard from "./components/CitizenDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";
import ServiceDetails from "./components/ServiceDetails";
import ReportForm from "./components/ReportForm";
import EmergencyServices from "./components/EmergencyServices";
import CityNews from "./components/CityNews";
import ComplaintHistory from "./components/ComplaintHistory";
import About from "./components/About";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [userRole, setUserRole] = useState(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        return JSON.parse(user).role;
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setUserRole(JSON.parse(user).role);
      } catch {
        setUserRole(null);
      }
    }
  }, []);

  const handleLogin = (role) => setUserRole(role);
  const handleSignup = (role) => setUserRole(role);

  const handleLogout = () => {
    // Clear all authentication-related data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setUserRole(null);
  };

  // Determine redirect destination based on user role
  const getDashboardPath = () => {
    if (!userRole) return "/login";
    const normalizedRole = userRole?.toUpperCase();
    if (normalizedRole === "ADMIN") return "/admin-dashboard";
    if (normalizedRole === "CITIZEN") return "/citizen-dashboard";
    return "/login";
  };

  return (
    <Router>
      <Navbar userRole={userRole} onLogout={handleLogout} />

      <Routes>
        {/* Default route - redirect based on auth status and role */}
        <Route
          path="/"
          element={
            userRole ? (
              <Navigate to={getDashboardPath()} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Auth routes - redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={
            userRole ? (
              <Navigate to={getDashboardPath()} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            userRole ? (
              <Navigate to={getDashboardPath()} replace />
            ) : (
              <Signup onSignup={handleSignup} />
            )
          }
        />

        {/* Protected routes for authenticated users */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cityservices"
          element={
            <ProtectedRoute>
              <CityServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-form"
          element={
            <ProtectedRoute>
              <ReportForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emergency"
          element={
            <ProtectedRoute>
              <EmergencyServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <CityNews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <ComplaintHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen"
          element={
            <ProtectedRoute>
              <ServiceDetails />
            </ProtectedRoute>
          }
        />

        {/* Role-specific dashboard routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citizen-dashboard"
          element={
            <ProtectedRoute role="CITIZEN">
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />

        {/* Legacy dashboard route - redirects to appropriate dashboard */}
        <Route
          path="/dashboard"
          element={<Navigate to={getDashboardPath()} replace />}
        />

        {/* Catch-all - redirect to login if route not found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
