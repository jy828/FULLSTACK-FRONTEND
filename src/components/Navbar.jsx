import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Notifications from "./Notifications";

const getInitials = () => {
  const name = localStorage.getItem("userName") || "";
  const email = localStorage.getItem("userEmail") || "";
  const base = name.trim() || email.trim();
  if (!base) return "";
  const parts = base.split(/\s+/);
  const first = parts[0]?.[0] || "";
  const second = parts[1]?.[0] || "";
  return (first + second).toUpperCase();
};

const Navbar = ({ userRole, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [initials, setInitials] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setInitials(getInitials());
  }, [userRole]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setOpen(false);
    onLogout?.();
    navigate("/login");
  };

  const isLoggedIn = Boolean(userRole);

  return (
    <header className="nav-root">
      <div className="nav-wrap">
        <Link to="/home" className="nav-brand" aria-label="Go to Home">
          <span className="brand-logo" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 21V9h4v12M10 21V3h4v18M16 21V12h4v9" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="brand-text">CitySmart</span>
        </Link>

        <div className="nav-actions" ref={dropdownRef}>
          {isLoggedIn && <Notifications userRole={userRole} />}
          <button
            className="avatar-btn"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Account menu"
            title={isLoggedIn ? `Logged in (${userRole})` : "Account"}
          >
            {isLoggedIn && initials ? (
              <span className="avatar-initials" aria-hidden>{initials}</span>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Z" stroke="#111827" strokeWidth="1.8"/>
                <path d="M3 21c0-3.866 4.477-7 9-7s9 3.134 9 7" stroke="#111827" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </button>

          {open && (
            <div className="dropdown" role="menu">
              {!userRole ? (
                <>
                  <Link to="/login" className="dropdown-item" onClick={() => setOpen(false)} role="menuitem">
                    Login
                  </Link>
                  <Link to="/signup" className="dropdown-item" onClick={() => setOpen(false)} role="menuitem">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to={userRole?.toUpperCase() === "ADMIN" ? "/admin-dashboard" : "/citizen-dashboard"} 
                    className="dropdown-item" 
                    onClick={() => setOpen(false)} 
                    role="menuitem"
                  >
                    {userRole?.toUpperCase() === "ADMIN" ? "👨‍💼 Admin" : "👤 Citizen"} Dashboard
                  </Link>
                  <Link to="/emergency" className="dropdown-item" onClick={() => setOpen(false)} role="menuitem">
                    🚨 Emergency Services
                  </Link>
                  <Link to="/news" className="dropdown-item" onClick={() => setOpen(false)} role="menuitem">
                    📰 City News
                  </Link>
                  <Link to="/history" className="dropdown-item" onClick={() => setOpen(false)} role="menuitem">
                    📋 My Complaints
                  </Link>
                  <Link to="/about" className="dropdown-item" onClick={() => setOpen(false)} role="menuitem">
                    ℹ️ About & Help
                  </Link>
                  <Link to="/profile" className="dropdown-item" onClick={() => setOpen(false)} role="menuitem">
                    Profile
                  </Link>
                  <button className="dropdown-item danger" onClick={handleLogoutClick} role="menuitem">
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
