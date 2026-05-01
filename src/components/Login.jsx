import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [role, setRole] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      const { token, id, name, email: userEmail, role: userRole } = response.data;

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ id, name, email: userEmail, role: userRole }));
      localStorage.setItem("userEmail", userEmail || email);
      localStorage.setItem("userName", name || "");
      localStorage.setItem("userId", id);

      // Call onLogin with user's role
      onLogin(userRole || role);
      
      // Role-based redirection
      // Normalize role to uppercase for comparison
      const normalizedRole = userRole?.toUpperCase();
      if (normalizedRole === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (normalizedRole === "CITIZEN") {
        navigate("/citizen-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fee', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              disabled={loading}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={loading}
            />
          </label>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)} disabled={loading}>
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup" className="link-btn">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
