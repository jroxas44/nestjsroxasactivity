import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

