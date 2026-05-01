import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 * 
 * Protects routes based on:
 * 1. User authentication (token exists)
 * 2. User role (ADMIN, CITIZEN, etc.)
 * 
 * Usage:
 * <ProtectedRoute role="ADMIN">
 *   <AdminDashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children, role }) => {
  // Check if user is authenticated
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  // If no token, redirect to login
  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userString);

    // If role is specified, check if user has the required role
    if (role) {
      // Normalize role comparison (handle case sensitivity)
      const userRole = user.role?.toUpperCase();
      const requiredRole = role?.toUpperCase();

      if (userRole !== requiredRole) {
        // User doesn't have the required role
        // Redirect to appropriate dashboard based on their actual role
        if (userRole === "ADMIN") {
          return <Navigate to="/admin-dashboard" replace />;
        } else if (userRole === "CITIZEN") {
          return <Navigate to="/citizen-dashboard" replace />;
        } else {
          return <Navigate to="/login" replace />;
        }
      }
    }

    // User is authenticated and has the required role
    return children;
  } catch (error) {
    console.error("Error parsing user data:", error);
    // Invalid user data, redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
