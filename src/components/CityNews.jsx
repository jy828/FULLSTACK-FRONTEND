import React, { useState, useEffect } from 'react';
import { newsAPI } from '../api';
import './CityNews.css';

const CityNews = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["General", "Event", "Alert", "Update", "Award"];
  const categoryIcons = {
    "General": "📰",
    "Event": "🎉",
    "Alert": "⚠️",
    "Update": "🔄",
    "Award": "🏆"
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await newsAPI.getAll();
      setNews(response.data || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news. Showing cached news.");
      // Fallback to localStorage
      try {
        const stored = localStorage.getItem("cityNews");
        setNews(stored ? JSON.parse(stored) : []);
      } catch {
        setNews([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("cityNews", JSON.stringify(news));
  }, [news]);

  const addNews = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      const newsData = {
        title: title.trim(),
        content: description.trim(),
        category,
        imageUrl: null
      };

      const response = await newsAPI.create(newsData);
      
      const newItem = {
        id: response.data.id || Date.now(),
        title: title.trim(),
        description: description.trim(),
        content: description.trim(),
        category,
        icon: categoryIcons[category],
        createdAt: response.data.createdAt || new Date().toISOString(),
        likes: 0
      };

      setNews([newItem, ...news]);
      setTitle("");
      setDescription("");
      setCategory("General");
      setShowForm(false);
    } catch (err) {
      console.error("Error creating news:", err);
      alert("Failed to create announcement. Please try again.");
    }
  };

  const deleteNews = (id) => {
    setNews(news.filter(item => item.id !== id));
  };

  const toggleLike = (id) => {
    setNews(news.map(item =>
      item.id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
    ));
  };

  return (
    <div className="cn-container">
      <div className="cn-page">
        {/* Header */}
        <div className="cn-header">
          <h1>📰 City News & Announcements</h1>
          <p>Stay updated with the latest news and announcements from your city</p>
          <button
            className="cn-btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "✕ Close" : "+ New Announcement"}
          </button>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>Loading news...</div>}
        {error && <div style={{ color: 'orange', textAlign: 'center', padding: '1rem', backgroundColor: '#fef3cd', borderRadius: '4px', margin: '1rem 0' }}>{error}</div>}

        {/* Form Section */}
        {showForm && (
          <div className="cn-form-container">
            <h2>Create New Announcement</h2>
            <form onSubmit={addNews} className="cn-form">
              <label>
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  required
                />
              </label>

              <label>
                Category
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryIcons[cat]} {cat}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter full details of the announcement"
                  rows={4}
                  required
                />
              </label>

              <button type="submit" className="cn-btn-submit">
                📤 Publish
              </button>
            </form>
          </div>
        )}

        {/* News Feed */}
        {!loading && (
        <div className="cn-feed">
          {news.length === 0 ? (
            <div className="cn-empty">
              <div className="cn-empty-icon">📭</div>
              <p>No announcements yet</p>
              <small>Check back later for city updates</small>
            </div>
          ) : (
            news.map((item) => (
              <div key={item.id} className="cn-card">
                <div className="cn-card-header">
                  <div className="cn-badge">{item.icon} {item.category}</div>
                  <span className="cn-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="cn-title">{item.title}</h3>
                <p className="cn-description">{item.description || item.content}</p>
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: '100%', borderRadius: '8px', marginTop: '0.5rem' }} />}

                <div className="cn-card-footer">
                  <button
                    className="cn-like-btn"
                    onClick={() => toggleLike(item.id)}
                  >
                    👍 {item.likes || 0}
                  </button>
                  <button
                    className="cn-delete-btn"
                    onClick={() => deleteNews(item.id)}
                    title="Delete announcement"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default CityNews;
