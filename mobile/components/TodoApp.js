import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { todoApi } from '../services/api';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import EditModal from './EditModal';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const { user, logout } = useAuth();

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
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to load todos. Make sure the backend is running.');
      }
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
      if (err.response?.status === 401) {
        Alert.alert('Error', 'Session expired. Please login again.');
      } else {
        Alert.alert('Error', 'Failed to create todo');
      }
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

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Todo App</Text>
            {user?.name && <Text style={styles.headerSubtitle}>Hello, {user.name}</Text>}
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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

