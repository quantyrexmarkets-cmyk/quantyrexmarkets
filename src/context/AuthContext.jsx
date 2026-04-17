import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe } from '../services/api';

const AuthContext = createContext();

const getTokenExpiry = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000;
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user from sessionStorage on initial load
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [minLoadDone, setMinLoadDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMinLoadDone(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = sessionStorage.getItem('user');
    
    // If we have saved user from login, use it
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoading(false);
      return;
    }
    
    if (token) {
      const expiry = getTokenExpiry(token);
      if (expiry && Date.now() >= expiry) {
        logout();
        setLoading(false);
        return;
      }

      getMe()
        .then(data => {
          if (data && data._id) {
            setUser(data);
            sessionStorage.setItem('user', JSON.stringify(data));
          } else {
            logout();
          }
        })
        .catch(err => {
          console.error('getMe failed:', err);
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [logout]);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    sessionStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  };

  return (
    <AuthContext.Provider value={{ user, loading: loading || !minLoadDone, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
