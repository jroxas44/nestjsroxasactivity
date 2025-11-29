import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PasswordRequirements({ password }) {
  const requirements = [
    { label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { label: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { label: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { label: 'One number', test: (pwd) => /\d/.test(pwd) },
    { label: 'One special character', test: (pwd) => /[@$!%*?&]/.test(pwd) },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Requirements:</Text>
      {requirements.map((req, index) => {
        const isValid = req.test(password);
        return (
          <View key={index} style={styles.requirement}>
            <Text style={[styles.checkmark, isValid && styles.checkmarkValid]}>
              {isValid ? '✓' : '✗'}
            </Text>
            <Text style={[styles.label, isValid && styles.labelValid]}>
              {req.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff4444',
    marginRight: 8,
    width: 16,
  },
  checkmarkValid: {
    color: '#4CAF50',
  },
  label: {
    fontSize: 12,
    color: '#999',
  },
  labelValid: {
    color: '#333',
  },
});

