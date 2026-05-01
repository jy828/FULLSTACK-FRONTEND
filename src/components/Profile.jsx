import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Load stored profile info
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [email] = useState(localStorage.getItem("userEmail") || "");
  const [role] = useState(localStorage.getItem("userRole") || "");
  const [address, setAddress] = useState(localStorage.getItem("userAddress") || "");
  const [status, setStatus] = useState(localStorage.getItem("userStatus") || "Active");
  const [savedMsg, setSavedMsg] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", name);
    localStorage.setItem("userAddress", address);
    localStorage.setItem("userStatus", status);
    setSavedMsg("Profile updated");
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userStatus");
    navigate("/login", { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Your Profile</h2>

        <form className="auth-form" onSubmit={handleSave}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </label>

          <label>
            Email
            <input type="email" value={email} readOnly />
          </label>

          <label>
            Role
            <input type="text" value={role} readOnly />
          </label>

          <label>
            Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House no, Street, City"
            />
          </label>

          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active">Active</option>
              <option value="Busy">Busy</option>
              <option value="Away">Away</option>
            </select>
          </label>

          <button type="submit" className="btn-primary">Save changes</button>
        </form>

        {savedMsg && (
          <p className="auth-switch" style={{ color: "#16a34a" }}>{savedMsg}</p>
        )}

        <div className="auth-form" style={{ marginTop: 16 }}>
          <h3 className="auth-title" style={{ fontSize: 18, marginBottom: 8 }}>Available in this app</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: "#374151" }}>
            <li>City Services: request services, report issues</li>
            <li>Dashboards: role-based Citizen/Admin</li>
            <li>Profile: manage name, address, status</li>
          </ul>
        </div>

        <div style={{ marginTop: 16 }}>
          <button className="btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
