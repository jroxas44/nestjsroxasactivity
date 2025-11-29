import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, Alert } from 'react-native';
import { todoApi } from './services/api';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import EditModal from './components/EditModal';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

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
      setError('Failed to load todos. Make sure the backend is running.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      const response = await todoApi.create(data);
      setTodos([response.data, ...todos]);
    } catch (err) {
      Alert.alert('Error', 'Failed to create todo');
      console.error('Error creating todo:', err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const response = await todoApi.update(id, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === id ? response.data : t)));
    } catch (err) {
      Alert.alert('Error', 'Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoApi.delete(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      Alert.alert('Error', 'Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = async (data) => {
    try {
      const response = await todoApi.update(editingTodo.id, data);
      setTodos(todos.map((t) => (t.id === editingTodo.id ? response.data : t)));
      setEditingTodo(null);
    } catch (err) {
      Alert.alert('Error', 'Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleCloseEdit = () => {
    setEditingTodo(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todo App</Text>
      </View>
      <ScrollView style={styles.content}>
        <TodoForm onSubmit={handleCreate} />
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Loading todos...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </ScrollView>
      <EditModal
        visible={editingTodo !== null}
        todo={editingTodo}
        onSave={handleUpdate}
        onCancel={handleCloseEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
  },
});
