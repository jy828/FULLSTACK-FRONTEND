import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./CitizenDashboard.css";
import ComplaintAnalytics from "./ComplaintAnalytics";
import WeatherWidget from "./WeatherWidget";

// Categories and Locations
const CATEGORIES = ["Road", "Water", "Electricity", "Sanitation", "Other"];
const LOCATIONS = ["Sector 1", "Sector 5", "Sector 8", "Sector 12", "Main Road", "Park Area", "Downtown", "Market Zone"];
const STATUSES = ["Pending", "In Progress", "Resolved", "Rejected"];

// Main Component
const CitizenDashboard = () => {
  // --- Complaints State ---
  const [complaints, setComplaints] = useState(() => {
    try {
      const raw = localStorage.getItem("citizenComplaints");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    localStorage.setItem("citizenComplaints", JSON.stringify(complaints));
  }, [complaints]);

  // Calculate stats
  const pendingCount = useMemo(
    () => complaints.filter((c) => c.status === "Pending").length,
    [complaints]
  );

  const inProgressCount = useMemo(
    () => complaints.filter((c) => c.status === "In Progress").length,
    [complaints]
  );

  const resolvedCount = useMemo(
    () => complaints.filter((c) => c.status === "Resolved").length,
    [complaints]
  );

  const rejectedCount = useMemo(
    () => complaints.filter((c) => c.status === "Rejected").length,
    [complaints]
  );

  const addComplaint = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    const newItem = {
      id: Date.now(),
      title: title.trim(),
      description: desc.trim(),
      category,
      location,
      status: "Pending",
      image: imagePreview,
      createdAt: new Date().toISOString(),
    };
    setComplaints([newItem, ...complaints]);
    setTitle("");
    setDesc("");
    setCategory(CATEGORIES[0]);
    setLocation(LOCATIONS[0]);
    setImagePreview("");
  };

  const updateStatus = (id, newStatus) => {
    setComplaints((list) =>
      list.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
  };

  const deleteComplaint = (id) => {
    setComplaints((list) => list.filter((c) => c.id !== id));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- City Information with Images ---
  const city = {
    hospitals: [
      {
        name: "City Hospital",
        address: "Main Road, Sector 12",
        phone: "011-2345678",
        img: "./doc.jpg",
      },
      {
        name: "Sunrise Clinic",
        address: "Park Avenue, Block B",
        phone: "011-2233445",
        img: "./doc2.jpg",
      },
    ],
    touristPlaces: [
      {
        name: "Central Park",
        desc: "Green oasis with jogging tracks and lake.",
        img: "./park.jpg",
      },
      {
        name: "City Museum",
        desc: "Artifacts and history exhibits.",
        img: "./meuseum.webp",
      },
    ],
    salons: [
      {
        name: "Great Salon",
        area: "Downtown",
        img: "./salon.jpg",
      },
      {
        name: "Style Studio",
        area: "East Market",
        img: "./style.avif",
      },
    ],
    offices: [
      {
        name: "Municipal Corporation",
        dept: "Civic Services",
        img: "./muni.jpg",
      },
      {
        name: "RTO Office",
        dept: "Transport",
        img: "./rto.webp",
      },
    ],
    schemes: [
      {
        title: "Clean City Initiative",
        brief: "Subsidies for waste segregation units.",
        img: "./clean.jpg",
      },
      {
        title: "Green Homes",
        brief: "Rebates on solar rooftop installations.",
        img: "./grren.png",
      },
    ],
  };

  return (
    <div className="cd-page">
      {/* Header */}
      <div className="cd-header">
        <h1>Citizen Dashboard</h1>
        <div className="cd-actions">
          <Link to="/profile" className="cd-link">
            Profile
          </Link>
          <Link to="/cityservices" className="cd-link">
            City Services
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="cd-kpis">
        <div className="cd-kpi gradient-blue">
          <div className="cd-kpi-title">📋 Pending</div>
          <div className="cd-kpi-value">{pendingCount}</div>
        </div>
        <div className="cd-kpi gradient-yellow">
          <div className="cd-kpi-title">⚙️ In Progress</div>
          <div className="cd-kpi-value">{inProgressCount}</div>
        </div>
        <div className="cd-kpi gradient-green">
          <div className="cd-kpi-title">✅ Resolved</div>
          <div className="cd-kpi-value">{resolvedCount}</div>
        </div>
        <div className="cd-kpi gradient-red">
          <div className="cd-kpi-title">❌ Rejected</div>
          <div className="cd-kpi-value">{rejectedCount}</div>
        </div>
      </div>

      {/* Weather Widget */}
      <div style={{ maxWidth: "400px", margin: "40px auto" }}>
        <WeatherWidget />
      </div>

      {/* Complaints Section */}
      <section className="cd-section">
        <div className="cd-section-head">
          <h2>Complaints</h2>
        </div>
        <div className="cd-grid-2">
          {/* Create Complaint */}
          <div className="cd-card cd-visual-card">
            <h3 className="cd-card-title">Create a Complaint</h3>
            <form onSubmit={addComplaint} className="cd-form">
              <label>
                Title
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Short title"
                  required
                />
              </label>
              <label>
                Description
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Describe the issue"
                  rows={3}
                  required
                />
              </label>
              <label>
                Category
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Location
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Upload Image (Optional)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cd-file-input"
                />
              </label>
              {imagePreview && (
                <div className="cd-image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => setImagePreview("")}
                    className="cd-remove-image"
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
              <button className="cd-btn-primary" type="submit">
                Submit Complaint
              </button>
            </form>
          </div>

          {/* Recent Complaints */}
          <div className="cd-card cd-visual-card">
            <h3 className="cd-card-title">Recent Complaints</h3>
            {complaints.length === 0 ? (
              <p className="cd-muted">No complaints yet.</p>
            ) : (
              <ul className="cd-list">
                {complaints.slice(0, 5).map((c) => (
                  <li key={c.id} className="cd-list-item">
                    <div className="cd-list-main">
                      <div className="cd-list-title">{c.title}</div>
                      <div className="cd-list-sub">
                        📍 {c.location} • {c.category}
                      </div>
                      <div className="cd-list-sub">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </div>
                      <div className="cd-list-desc">{c.description}</div>
                      {c.image && (
                        <img src={c.image} alt={c.title} className="cd-complaint-img" />
                      )}
                    </div>
                    <div className="cd-list-actions">
                      <span
                        className={`cd-status cd-status-${c.status.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {c.status}
                      </span>
                      <button
                        className="cd-btn-delete"
                        onClick={() => deleteComplaint(c.id)}
                        title="Delete complaint"
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <ComplaintAnalytics complaints={complaints} />

      {/* City Info Section */}
      <section className="cd-section">
        <div className="cd-section-head">
          <h2>City Information</h2>
        </div>

        <div className="cd-grid-3">
          {/* Hospitals */}
          {city.hospitals.map((h, i) => (
            <div key={i} className="cd-card cd-visual-card">
              <img src={h.img} alt={h.name} className="cd-card-img" />
              <h3 className="cd-card-title">{h.name}</h3>
              <p className="cd-muted">{h.address}</p>
              <p className="cd-muted">Phone: {h.phone}</p>
            </div>
          ))}

          {/* Tourist Places */}
          {city.touristPlaces.map((p, i) => (
            <div key={i} className="cd-card cd-visual-card">
              <img src={p.img} alt={p.name} className="cd-card-img" />
              <h3 className="cd-card-title">{p.name}</h3>
              <p className="cd-muted">{p.desc}</p>
            </div>
          ))}

          {/* Salons */}
          {city.salons.map((s, i) => (
            <div key={i} className="cd-card cd-visual-card">
              <img src={s.img} alt={s.name} className="cd-card-img" />
              <h3 className="cd-card-title">{s.name}</h3>
              <p className="cd-muted">Area: {s.area}</p>
            </div>
          ))}

          {/* Offices */}
          {city.offices.map((o, i) => (
            <div key={i} className="cd-card cd-visual-card">
              <img src={o.img} alt={o.name} className="cd-card-img" />
              <h3 className="cd-card-title">{o.name}</h3>
              <p className="cd-muted">Dept: {o.dept}</p>
            </div>
          ))}

          {/* Government Schemes */}
          {city.schemes.map((g, i) => (
            <div key={i} className="cd-card cd-visual-card">
              <img src={g.img} alt={g.title} className="cd-card-img" />
              <h3 className="cd-card-title">{g.title}</h3>
              <p className="cd-muted">{g.brief}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CitizenDashboard;
