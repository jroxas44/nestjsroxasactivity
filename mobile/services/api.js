import axios from 'axios';

const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3001' 
  : 'http://your-production-api-url.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  getAll: () => api.get('/todos'),
  getById: (id) => api.get(`/todos/${id}`),
  create: (data) => api.post('/todos', data),
  update: (id, data) => api.patch(`/todos/${id}`, data),
  delete: (id) => api.delete(`/todos/${id}`),
};

export default api;

