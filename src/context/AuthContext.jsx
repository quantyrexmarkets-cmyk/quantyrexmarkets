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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('AuthContext: checking token...', token ? 'found' : 'not found');
    
    if (token) {
      const expiry = getTokenExpiry(token);
      if (expiry && Date.now() >= expiry) {
        console.log('AuthContext: token expired');
        logout();
        setLoading(false);
        return;
      }

      console.log('AuthContext: calling getMe()...');
      getMe()
        .then(data => {
          console.log('AuthContext: getMe response:', data);
          if (data && data._id) {
            console.log('AuthContext: user loaded successfully');
            setUser(data);
            if (expiry) {
              const timeout = expiry - Date.now();
              setTimeout(() => {
                logout();
                window.location.href = '/signin';
              }, timeout);
            }
          } else {
            console.log('AuthContext: getMe returned invalid data, clearing token');
            localStorage.removeItem('token');
            setUser(null);
          }
        })
        .catch(err => {
          console.log('AuthContext: getMe error:', err);
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => {
          console.log('AuthContext: loading complete');
          setLoading(false);
        });
    } else {
      console.log('AuthContext: no token found');
      setLoading(false);
    }
  }, [logout]);

  const login = (token, userData) => {
    console.log('AuthContext: login called with user:', userData);
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const updateUser = (userData) => setUser(prev => ({ ...prev, ...userData }));

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
