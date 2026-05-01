import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api";
import "./Signup.css";

const Signup = ({ onSignup }) => {
  const [role, setRole] = useState("citizen");
  const [name, setName] = useState("");
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
      const userData = {
        name,
        email,
        password,
        role
      };

      await authAPI.signup(userData);

      // Show success message
      alert("Account created successfully! Please login.");
      
      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.message && err.message.includes('Backend server is not running')) {
        setError("❌ Backend server is not running! Please start the Spring Boot backend at http://localhost:8080/api");
      } else {
        setError(err.response?.data?.message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create an account</h2>
        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fee', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your full name"
              disabled={loading}
            />
          </label>

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
              placeholder="Create a strong password"
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login" className="link-btn">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
