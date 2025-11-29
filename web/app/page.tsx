'use client';

import { useState, useEffect } from 'react';
import { todoApi, Todo, CreateTodoDto, UpdateTodoDto } from '@/lib/api';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import EditModal from '@/components/EditModal';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoApi.getAll();
      setTodos(response.data);
    } catch (err) {
      setError('Failed to load todos. Make sure the backend is running on http://localhost:3001');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateTodoDto) => {
    try {
      const response = await todoApi.create(data);
      setTodos([response.data, ...todos]);
    } catch (err) {
      alert('Failed to create todo');
      console.error('Error creating todo:', err);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      
      const response = await todoApi.update(id, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === id ? response.data : t)));
    } catch (err) {
      alert('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await todoApi.delete(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      alert('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = async (data: UpdateTodoDto) => {
    if (!editingTodo) return;
    
    try {
      const response = await todoApi.update(editingTodo.id, data);
      setTodos(todos.map((t) => (t.id === editingTodo.id ? response.data : t)));
      setEditingTodo(null);
    } catch (err) {
      alert('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleCloseEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-500 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">Todo App</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TodoForm onSubmit={handleCreate} />
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-600">Loading todos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </main>
      <EditModal
        isOpen={editingTodo !== null}
        todo={editingTodo}
        onSave={handleUpdate}
        onClose={handleCloseEdit}
      />
    </div>
  );
}
