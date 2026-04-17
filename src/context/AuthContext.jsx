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
  const getSavedUser = () => {
    try {
      const raw = sessionStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  };

  const getSavedToken = () => localStorage.getItem('token');

  const [user, setUser] = useState(getSavedUser);
  const [loading, setLoading] = useState(() => {
    const hasUser = !!getSavedUser();
    const hasToken = !!getSavedToken();
    return hasToken && !hasUser;
  });

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = getSavedToken();
    const savedUser = getSavedUser();

    if (savedUser) {
      setUser(savedUser);
      setLoading(false);
      return;
    }

    if (!token) {
      setLoading(false);
      return;
    }

    const expiry = getTokenExpiry(token);
    if (expiry && Date.now() >= expiry) {
      logout();
      return;
    }

    setLoading(true);
    getMe()
      .then((data) => {
        if (data && data._id) {
          setUser(data);
          sessionStorage.setItem('user', JSON.stringify(data));
        } else {
          logout();
        }
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [logout]);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setLoading(false);
  };

  const updateUser = (userData) => {
    setUser((prev) => {
      const updated = { ...prev, ...userData };
      sessionStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
