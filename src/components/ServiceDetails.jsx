import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CityServices.css";

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state;

  if (!service) {
    return (
      <div className="cd-page">
        <p>Please select a service from the City Services page.</p>
      </div>
    );
  }

  // Informative details and actions per service
  const serviceInfo = {
    "Water Supply": {
      schedule: "⏰ 7:00 AM - 9:00 PM",
      tips: "💧 Weekly water quality reports available online.",
      contact: "📞 Report Leaks: 011-123456",
      actions: [
        { label: "Report a Leak", type: "primary" },
        { label: "Request New Connection", type: "secondary" },
      ],
      icon: "💧",
    },
    Electricity: {
      schedule: "⚡ Scheduled maintenance: Wednesdays 10:00 AM - 12:00 PM",
      tips: "🔌 Track power consumption and pay bills online anytime.",
      contact: "📞 Emergency Line: 011-654321",
      actions: [
        { label: "Report Outage", type: "primary" },
        { label: "Pay Bill", type: "secondary" },
      ],
      icon: "⚡",
    },
    "Waste Management": {
      schedule:
        "🚛 Collection: Mondays & Thursdays 6:00 AM - 10:00 AM (organic & recyclable separately)",
      tips: "♻️ Segregate your waste to get faster collection.",
      contact: "📞 Request Pickup / Report Missed Collection: 011-789012",
      actions: [
        { label: "Request Pickup", type: "primary" },
        { label: "Report Missed Collection", type: "secondary" },
      ],
      icon: "🚛",
    },
    Transportation: {
      schedule: "🚌 Operating hours: 6:00 AM - 11:00 PM",
      tips: "📍 Use live tracker to check bus/metro delays and routes.",
      contact: "📞 Transport Helpline: 011-345678",
      actions: [
        { label: "Plan Journey", type: "primary" },
        { label: "Report Issue", type: "secondary" },
      ],
      icon: "🚌",
    },
  };

  const info = serviceInfo[service.title];

  // 🔥 navigate to form with state
  const handleAction = (label) => {
    navigate("/report-form", {
      state: { serviceName: service.title, actionType: label },
    });
  };

  return (
    <div className="cd-page">
      <div className="cd-section">
        <div className="cd-section-head">
          <h2>
            {info.icon} {service.title}
          </h2>
        </div>

        <div className="cd-card cd-visual-card">
          <img src={service.img} alt={service.title} className="cd-card-img" />

          <div style={{ padding: "16px" }}>
            <p className="cd-muted">{service.details}</p>
            <hr style={{ margin: "12px 0" }} />

            <h4>Service Schedule</h4>
            <div className="cd-card-info">
              <div className="cd-badge">{info.schedule}</div>
              <div className="cd-badge">{info.tips}</div>
              <div className="cd-badge">{info.contact}</div>
            </div>

            <div style={{ marginTop: "16px" }}>
              {info.actions.map((a, idx) => (
                <button
                  key={idx}
                  className={
                    a.type === "primary" ? "cd-btn-primary" : "cd-btn-secondary"
                  }
                  style={{ marginRight: "8px", marginTop: "8px" }}
                  onClick={() => handleAction(a.label)}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
