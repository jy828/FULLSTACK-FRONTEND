import React, { useState, useEffect, useRef } from 'react';
import './Notifications.css';

const Notifications = ({ userRole }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const dropdownRef = useRef(null);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadNotifications = () => {
    try {
      const stored = localStorage.getItem("notifications");
      const data = stored ? JSON.parse(stored) : [];
      setNotifications(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    } catch {
      setNotifications([]);
    }
  };

  const addNotification = (notification) => {
    const newNotif = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };

    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const markAsRead = (id) => {
    const updated = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === "All" 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const notificationTypes = [...new Set(notifications.map(n => n.type))];

  return (
    <div className="notif-container" ref={dropdownRef}>
      <button
        className="notif-button"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        title={`${unreadCount} unread notifications`}
      >
        <span className="notif-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="notif-dropdown">
          {/* Header */}
          <div className="notif-header">
            <h3>Notifications</h3>
            <button
              className="notif-close"
              onClick={() => setOpen(false)}
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Filter Tabs */}
          {notificationTypes.length > 1 && (
            <div className="notif-filters">
              <button
                className={`notif-filter-tab ${filter === "All" ? "active" : ""}`}
                onClick={() => setFilter("All")}
              >
                All
              </button>
              {notificationTypes.map(type => (
                <button
                  key={type}
                  className={`notif-filter-tab ${filter === type ? "active" : ""}`}
                  onClick={() => setFilter(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredNotifications.length === 0 ? (
            <div className="notif-empty">
              <div className="notif-empty-icon">📭</div>
              <p>No {filter !== "All" ? filter.toLowerCase() : ""} notifications</p>
            </div>
          ) : (
            <>
              {/* Notifications List */}
              <div className="notif-list">
                {filteredNotifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`notif-item ${!notif.read ? "unread" : ""}`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="notif-item-content">
                      <div className="notif-item-icon">{notif.icon || "📢"}</div>
                      <div className="notif-item-text">
                        <div className="notif-item-title">{notif.title}</div>
                        <div className="notif-item-message">{notif.message}</div>
                        <div className="notif-item-time">
                          {getTimeAgo(new Date(notif.timestamp))}
                        </div>
                      </div>
                    </div>
                    <button
                      className="notif-item-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="notif-footer">
                {unreadCount > 0 && (
                  <button
                    className="notif-action-btn"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                )}
                <button
                  className="notif-action-btn notif-action-clear"
                  onClick={clearAll}
                >
                  Clear all
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Utility to format time
const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString();
};

export default Notifications;
