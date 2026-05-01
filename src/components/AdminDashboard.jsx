import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import ComplaintAnalytics from "./ComplaintAnalytics";

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved", "Rejected"];

const AdminDashboard = () => {
  // --- Complaints ---
  const [complaints, setComplaints] = useState(() => {
    try {
      const stored = localStorage.getItem("citizenComplaints");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    localStorage.setItem("citizenComplaints", JSON.stringify(complaints));
  }, [complaints]);

  const updateStatus = (id, status) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c
      )
    );
  };

  const deleteComplaint = (id) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
  };

  // --- City Info ---
  const [cityInfo, setCityInfo] = useState(() => {
    try {
      const stored = localStorage.getItem("cityInfo");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [newItem, setNewItem] = useState({ name: "", address: "", phone: "" });

  const addCityInfo = () => {
    if (!newItem.name || !newItem.address || !newItem.phone) {
      alert("Please fill all fields");
      return;
    }
    const updated = [...cityInfo, { ...newItem, id: Date.now() }];
    setCityInfo(updated);
    localStorage.setItem("cityInfo", JSON.stringify(updated));
    setNewItem({ name: "", address: "", phone: "" });
  };

  const deleteCityInfo = (id) => {
    const updated = cityInfo.filter((item) => item.id !== id);
    setCityInfo(updated);
    localStorage.setItem("cityInfo", JSON.stringify(updated));
  };

  // --- Analytics ---
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const rejected = complaints.filter((c) => c.status === "Rejected").length;

  // Filtered complaints
  const filteredComplaints = complaints.filter((c) => {
    const categoryMatch = filterCategory === "All" || c.category === filterCategory;
    const statusMatch = filterStatus === "All" || c.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const categories = [...new Set(complaints.map((c) => c.category))];

  return (
    <div className="ad-page">
      <header className="ad-header">
        <h1>Admin Dashboard</h1>
      </header>

      {/* --- Analytics Cards --- */}
      <div className="stats">
        <div className="card blue">
          <div className="stat-label">Total Complaints</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="card yellow">
          <div className="stat-label">⏳ Pending</div>
          <div className="stat-value">{pending}</div>
        </div>
        <div className="card orange">
          <div className="stat-label">⚙️ In Progress</div>
          <div className="stat-value">{inProgress}</div>
        </div>
        <div className="card green">
          <div className="stat-label">✅ Resolved</div>
          <div className="stat-value">{resolved}</div>
        </div>
        <div className="card red">
          <div className="stat-label">❌ Rejected</div>
          <div className="stat-value">{rejected}</div>
        </div>
      </div>

      {/* --- Complaint Management --- */}
      <section className="ad-section">
        <h2>Manage Complaints</h2>
        
        {/* Filters */}
        <div className="filter-section">
          <div className="filter-group">
            <label>Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredComplaints.length === 0 ? (
          <p className="ad-muted">No complaints found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c) => (
                  <tr key={c.id} className="table-row">
                    <td className="col-title">
                      <div className="title-text">{c.title}</div>
                      <div className="desc-text">{c.description.substring(0, 50)}...</div>
                    </td>
                    <td>{c.category}</td>
                    <td>📍 {c.location || "N/A"}</td>
                    <td>
                      <select
                        value={c.status}
                        onChange={(e) => updateStatus(c.id, e.target.value)}
                        className={`status-select status-${c.status.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => deleteComplaint(c.id)}
                        title="Delete complaint"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Analytics Section */}
      <ComplaintAnalytics complaints={complaints} />

      {/* --- City Info CRUD --- */}
      <section className="ad-section">
        <h2>Manage City Information</h2>
        <div className="input-section">
          <input
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="input-field"
          />
          <input
            placeholder="Address"
            value={newItem.address}
            onChange={(e) => setNewItem({ ...newItem, address: e.target.value })}
            className="input-field"
          />
          <input
            placeholder="Phone"
            value={newItem.phone}
            onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}
            className="input-field"
          />
          <button onClick={addCityInfo} className="input-btn">
            ➕ Add
          </button>
        </div>

        {cityInfo.length === 0 ? (
          <p className="ad-muted">No city information added yet.</p>
        ) : (
          <div className="info-grid">
            {cityInfo.map((item) => (
              <div key={item.id} className="info-card">
                <h4>{item.name}</h4>
                <p>{item.address}</p>
                <p className="phone-text">📞 {item.phone}</p>
                <button
                  className="delete-btn"
                  onClick={() => deleteCityInfo(item.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
