import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { complaintsAPI } from "../api";
import jsPDF from "jspdf";
import "./ReportForm.css";

const ReportForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName, actionType } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      // Create complaint object for backend
      const complaintData = {
        title: `${serviceName} - ${formData.name}`,
        description: formData.description,
        category: serviceName
      };

      // Submit to backend (userId sent as query parameter)
      const response = await complaintsAPI.create(complaintData, userId);

      // Also save to localStorage for offline access
      const existing = JSON.parse(localStorage.getItem("citizenComplaints")) || [];
      const newComplaint = {
        id: response.data.id || Date.now(),
        title: complaintData.title,
        description: complaintData.description,
        category: serviceName,
        location: formData.address,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };
      const updated = [newComplaint, ...existing];
      localStorage.setItem("citizenComplaints", JSON.stringify(updated));

      // Generate PDF
      const pdf = new jsPDF();
      pdf.text(`Service: ${serviceName}`, 10, 10);
      pdf.text(`Action: ${actionType}`, 10, 20);
      pdf.text(`Name: ${formData.name}`, 10, 30);
      pdf.text(`Phone: ${formData.phone}`, 10, 40);
      pdf.text(`Address: ${formData.address}`, 10, 50);
      pdf.text(`Issue Description: ${formData.description}`, 10, 60);
      pdf.save(`${serviceName}-${actionType}-report.pdf`);

      alert("Complaint Submitted Successfully!");
      navigate("/complaint-history");
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError(err.response?.data?.message || "Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <h2>
        {actionType} - {serviceName}
      </h2>

      {error && <div style={{ color: 'red', padding: '1rem', backgroundColor: '#fee', borderRadius: '4px', margin: '1rem 0' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="report-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          onChange={handleChange}
          disabled={loading}
        />
        <textarea
          name="description"
          placeholder="Describe Your Issue"
          required
          onChange={handleChange}
          disabled={loading}
        />

        <button type="submit" className="cd-btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
