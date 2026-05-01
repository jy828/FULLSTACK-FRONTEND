import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if backend is not reachable
    if (!error.response && error.code === 'ERR_NETWORK') {
      console.error('❌ Backend server is not running at http://localhost:8080');
      console.error('Please start the Spring Boot backend server first.');
      error.message = 'Backend server is not running. Please start the backend at http://localhost:8080';
    } else if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
};

// Complaints APIs
export const complaintsAPI = {
  create: (complaintData, userId) => api.post(`/complaints?userId=${userId}`, complaintData),
  getAll: () => api.get('/complaints'),
  getByUserId: (userId) => api.get(`/complaints/user/${userId}`),
  updateStatus: (id, status) => api.put(`/complaints/${id}/status`, { status }),
};

// News APIs
export const newsAPI = {
  getAll: () => api.get('/news'),
  create: (newsData) => api.post('/news', newsData),
};

// Emergency Services APIs
export const emergencyAPI = {
  getAll: () => api.get('/emergency-services'),
};

// City Services APIs
export const cityServicesAPI = {
  getAll: () => api.get('/city-services'),
};

// Notifications APIs
export const notificationsAPI = {
  getByUserId: (userId) => api.get(`/notifications/user/${userId}`),
};

export default api;
