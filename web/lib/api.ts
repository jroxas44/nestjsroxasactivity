import axios from 'axios';
import { auth } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      auth.removeAuth();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const todoApi = {
  getAll: (): Promise<{ data: Todo[] }> => api.get('/todos'),
  getById: (id: string): Promise<{ data: Todo }> => api.get(`/todos/${id}`),
  create: (data: CreateTodoDto): Promise<{ data: Todo }> => api.post('/todos', data),
  update: (id: string, data: UpdateTodoDto): Promise<{ data: Todo }> => api.patch(`/todos/${id}`, data),
  delete: (id: string): Promise<void> => api.delete(`/todos/${id}`),
};

export default api;

