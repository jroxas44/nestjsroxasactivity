import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import TodoApp from './components/TodoApp';

function AppNavigator() {
  const { user, loading } = useAuth();
  const [screen, setScreen] = useState('login');

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!user) {
    if (screen === 'login') {
      return <LoginScreen navigation={{ navigate: (s) => setScreen(s) }} />;
    }
    return <RegisterScreen navigation={{ navigate: (s) => setScreen(s) }} />;
  }

  return <TodoApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
