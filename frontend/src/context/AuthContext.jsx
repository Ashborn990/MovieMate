import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  // Verify active session with backend on initial load
  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await authApi.getCurrentUser();
      if (res && res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      // 401 is normal when visitor is browsing anonymously
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    if (res && res.success) {
      setUser(res.data);
      return res.data;
    }
    throw new Error(res?.message || 'Login failed');
  };

  const signup = async (userData) => {
    const res = await authApi.signup(userData);
    if (res && res.success) {
      setUser(res.data);
      return res.data;
    }
    throw new Error(res?.message || 'Sign up failed');
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn('Logout warning:', err.message);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        selectedCity,
        setSelectedCity,
        login,
        signup,
        logout,
        checkCurrentUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
