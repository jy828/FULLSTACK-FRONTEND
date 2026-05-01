import React, { useMemo } from 'react';
import './ComplaintAnalytics.css';

const ComplaintAnalytics = ({ complaints }) => {
  // Calculate statistics
  const stats = useMemo(() => {
    const categories = {};
    const statuses = {
      'Pending': 0,
      'In Progress': 0,
      'Resolved': 0,
      'Rejected': 0
    };
    const locations = {};

    complaints.forEach((c) => {
      // By category
      categories[c.category] = (categories[c.category] || 0) + 1;

      // By status
      statuses[c.status] = (statuses[c.status] || 0) + 1;

      // By location
      locations[c.location] = (locations[c.location] || 0) + 1;
    });

    return {
      categories: Object.entries(categories).map(([name, count]) => ({
        name,
        count,
        percentage: complaints.length > 0 ? ((count / complaints.length) * 100).toFixed(1) : 0
      })),
      statuses: Object.entries(statuses).map(([name, count]) => ({
        name,
        count,
        percentage: complaints.length > 0 ? ((count / complaints.length) * 100).toFixed(1) : 0,
        color: {
          'Pending': '#f59e0b',
          'In Progress': '#f97316',
          'Resolved': '#10b981',
          'Rejected': '#ef4444'
        }[name]
      })),
      locations: Object.entries(locations)
        .map(([name, count]) => ({
          name,
          count,
          percentage: complaints.length > 0 ? ((count / complaints.length) * 100).toFixed(1) : 0
        }))
        .sort((a, b) => b.count - a.count)
    };
  }, [complaints]);

  const totalComplaints = complaints.length;
  const resolvedRate = totalComplaints > 0 
    ? ((stats.statuses.find(s => s.name === 'Resolved')?.count || 0) / totalComplaints * 100).toFixed(1)
    : 0;

  // Simple bar chart component
  const BarChart = ({ data, maxValue }) => {
    const maxVal = maxValue || Math.max(...data.map(d => d.count), 1);
    return (
      <div className="ca-bar-chart">
        {data.map((item, idx) => (
          <div key={idx} className="ca-bar-item">
            <div className="ca-bar-label">{item.name}</div>
            <div className="ca-bar-container">
              <div
                className="ca-bar-fill"
                style={{
                  width: `${(item.count / maxVal) * 100}%`,
                  backgroundColor: item.color || '#2563eb'
                }}
              >
                {item.count > 0 && <span className="ca-bar-value">{item.count}</span>}
              </div>
            </div>
            <div className="ca-bar-percentage">{item.percentage}%</div>
          </div>
        ))}
      </div>
    );
  };

  // Simple pie chart component
  const PieChart = ({ data }) => {
    let currentAngle = 0;
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    
    const slices = data.map((item, idx) => {
      const sliceAngle = (item.count / totalComplaints) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      
      const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
      
      const largeArc = sliceAngle > 180 ? 1 : 0;
      const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
      
      const labelAngle = (startAngle + endAngle) / 2;
      const labelX = 50 + 25 * Math.cos((labelAngle - 90) * Math.PI / 180);
      const labelY = 50 + 25 * Math.sin((labelAngle - 90) * Math.PI / 180);
      
      currentAngle = endAngle;
      
      return (
        <g key={idx}>
          <path
            d={pathData}
            fill={colors[idx % colors.length]}
            stroke="white"
            strokeWidth="2"
            opacity="0.8"
          />
          {item.percentage > 5 && (
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dy="0.3em"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              {item.percentage}%
            </text>
          )}
        </g>
      );
    });

    return (
      <svg width="100%" viewBox="0 0 100 100" className="ca-pie-chart">
        {slices}
      </svg>
    );
  };

  if (totalComplaints === 0) {
    return (
      <div className="ca-container">
        <div className="ca-empty">
          <div className="ca-empty-icon">📊</div>
          <p>No complaints data available yet</p>
          <small>Create complaints to see analytics</small>
        </div>
      </div>
    );
  }

  return (
    <div className="ca-container">
      <h2 className="ca-title">📊 Complaint Analytics</h2>

      {/* Summary Cards */}
      <div className="ca-summary">
        <div className="ca-stat-card">
          <div className="ca-stat-value">{totalComplaints}</div>
          <div className="ca-stat-label">Total Complaints</div>
          <div className="ca-stat-emoji">📋</div>
        </div>
        <div className="ca-stat-card ca-stat-resolved">
          <div className="ca-stat-value">
            {stats.statuses.find(s => s.name === 'Resolved')?.count || 0}
          </div>
          <div className="ca-stat-label">Resolved</div>
          <div className="ca-stat-emoji">✅</div>
        </div>
        <div className="ca-stat-card ca-stat-pending">
          <div className="ca-stat-value">
            {stats.statuses.find(s => s.name === 'Pending')?.count || 0}
          </div>
          <div className="ca-stat-label">Pending</div>
          <div className="ca-stat-emoji">📍</div>
        </div>
        <div className="ca-stat-card ca-stat-rate">
          <div className="ca-stat-value">{resolvedRate}%</div>
          <div className="ca-stat-label">Resolution Rate</div>
          <div className="ca-stat-emoji">⚡</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="ca-charts">
        {/* Status Distribution */}
        <div className="ca-chart-container">
          <h3 className="ca-chart-title">Status Distribution</h3>
          <BarChart data={stats.statuses} />
        </div>

        {/* Category Breakdown */}
        <div className="ca-chart-container">
          <h3 className="ca-chart-title">By Category</h3>
          <BarChart data={stats.categories} />
        </div>
      </div>

      {/* Location Analysis */}
      {stats.locations.length > 0 && (
        <div className="ca-locations">
          <h3 className="ca-chart-title">🗺️ Top Locations</h3>
          <div className="ca-location-list">
            {stats.locations.slice(0, 5).map((loc, idx) => (
              <div key={idx} className="ca-location-item">
                <span className="ca-location-badge">{idx + 1}</span>
                <span className="ca-location-name">{loc.name}</span>
                <span className="ca-location-count">{loc.count} complaints</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintAnalytics;
