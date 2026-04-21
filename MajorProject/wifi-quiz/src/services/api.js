import axios from 'axios';

// Base API instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor – attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – handle expired/invalid token globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid – clear storage and reload
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ──────────────────────────────────────────────
// Auth endpoints
// ──────────────────────────────────────────────
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
};

// ──────────────────────────────────────────────
// Quiz endpoints
// ──────────────────────────────────────────────
export const quizAPI = {
  getQuestions: () => api.get('/quiz'),
  submitAttempt: (answers) => api.post('/quiz/submit', { answers }),
  getMyAttempts: () => api.get('/quiz/attempts/me'),
};

// ──────────────────────────────────────────────
// Admin endpoints
// ──────────────────────────────────────────────
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getUserAttempts: (userId) => api.get(`/admin/users/${userId}/attempts`),
  getQuestions: () => api.get('/admin/questions'),
  addQuestion: (data) => api.post('/admin/questions', data),
  updateQuestion: (id, data) => api.put(`/admin/questions/${id}`, data),
  deleteQuestion: (id) => api.delete(`/admin/questions/${id}`),
  getRecentActivity: () => api.get('/admin/activity'),
};

export default api;
