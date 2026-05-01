import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulated weather data (in real app, would use API like OpenWeatherMap)
  const weatherData = {
    'Sector 1': { temp: 28, condition: 'Sunny', icon: '☀️', humidity: 65, wind: 12 },
    'Sector 5': { temp: 26, condition: 'Cloudy', icon: '☁️', humidity: 72, wind: 8 },
    'Sector 8': { temp: 24, condition: 'Rainy', icon: '🌧️', humidity: 85, wind: 15 },
    'Sector 12': { temp: 27, condition: 'Partly Cloudy', icon: '⛅', humidity: 68, wind: 10 },
    'Main Road': { temp: 29, condition: 'Sunny', icon: '☀️', humidity: 60, wind: 14 },
    'Park Area': { temp: 25, condition: 'Clear', icon: '🌤️', humidity: 70, wind: 9 },
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        const locations = Object.keys(weatherData);
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const data = weatherData[randomLocation];

        setWeather({
          location: randomLocation,
          ...data,
          lastUpdated: new Date()
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    }, 500);
  };

  const refreshWeather = () => {
    fetchWeather();
  };

  if (error) {
    return (
      <div className="weather-widget weather-error">
        <p>⚠️ {error}</p>
        <button onClick={refreshWeather} className="weather-retry">
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="weather-widget weather-loading">
        <div className="weather-spinner"></div>
        <p>Loading weather...</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="weather-widget weather-empty">
        <p>No weather data available</p>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h3>🌍 Weather</h3>
        <button
          className="weather-refresh-btn"
          onClick={refreshWeather}
          title="Refresh weather data"
        >
          🔄
        </button>
      </div>

      <div className="weather-content">
        <div className="weather-location">{weather.location}</div>

        <div className="weather-main">
          <div className="weather-icon">{weather.icon}</div>
          <div className="weather-info">
            <div className="weather-temp">{weather.temp}°C</div>
            <div className="weather-condition">{weather.condition}</div>
          </div>
        </div>

        <div className="weather-details">
          <div className="weather-detail">
            <span className="weather-detail-label">💧 Humidity</span>
            <span className="weather-detail-value">{weather.humidity}%</span>
          </div>
          <div className="weather-detail">
            <span className="weather-detail-label">💨 Wind</span>
            <span className="weather-detail-value">{weather.wind} km/h</span>
          </div>
        </div>

        <div className="weather-footer">
          <small>Last updated: {weather.lastUpdated.toLocaleTimeString()}</small>
        </div>
      </div>

      {/* Quick Locations */}
      <div className="weather-locations">
        <h4>Quick Locations</h4>
        <div className="weather-location-grid">
          {Object.entries(weatherData).slice(0, 3).map(([location, data]) => (
            <div
              key={location}
              className="weather-location-card"
              onClick={() => setWeather({
                location,
                ...data,
                lastUpdated: new Date()
              })}
            >
              <div className="weather-loc-icon">{data.icon}</div>
              <div className="weather-loc-name">{location}</div>
              <div className="weather-loc-temp">{data.temp}°C</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
