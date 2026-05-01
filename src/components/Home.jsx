import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ role }) => {
  const name = localStorage.getItem("userName") || "";
  const email = localStorage.getItem("userEmail") || "";
  const isLoggedIn = Boolean(localStorage.getItem("userRole"));

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Smart City App</h1>
        <p>
          Explore city services, infrastructure updates, public amenities, and
          more.
        </p>
      </section>

      {/* Logged-in User Info */}
      {/* {isLoggedIn && (
        <section className="user-info">
          <div className="user-info__content">
            <h3 className="user-info__title">You are logged in</h3>
            <div className="user-info__grid">
              <div>
                <span className="user-info__label">Name:</span> {name || "—"}
              </div>
              <div>
                <span className="user-info__label">Email:</span> {email || "—"}
              </div>
              <div>
                <span className="user-info__label">Role:</span> {role || "—"}
              </div>
            </div>
            <Link to="/dashboard">
              <button className="btn-secondary" style={{ marginTop: 12 }}>
                Go to {role === "admin" ? "Admin" : "Citizen"} Dashboard
              </button>
            </Link>
          </div>
        </section>
      )} */}

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h2>City Services</h2>
          <p>
            Check availability, report issues, and access municipal services
            online.
          </p>
        </div>
        <div className="feature-card">
          <h2>Infrastructure Updates</h2>
          <p>
            Stay updated with ongoing projects, roadworks, and smart
            initiatives.
          </p>
        </div>
        <div className="feature-card">
          <h2>Citizen Engagement</h2>
          <p>
            Participate in surveys, report civic issues, and contribute to
            making your city smarter.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Join the Smart City Revolution</h2>
        <p>Your city, your voice. Engage with your city like never before.</p>
      </section>
    </div>
  );
};

export default Home;
