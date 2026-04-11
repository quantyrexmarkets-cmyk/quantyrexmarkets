const BASE_URL = import.meta.env.VITE_API_URL || 'https://quantyrexmarkets-production.up.railway.app';

const handleResponse = async (res) => {
  return res.json();
};

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`,
});

export const registerUser = (data) => fetch(`${BASE_URL}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse);
export const loginUser = (data) => fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse);
export const getMe = () => fetch(`${BASE_URL}/auth/me`, { headers: headers() }).then(handleResponse);
export const getDashboard = () => fetch(`${BASE_URL}/user/dashboard`, { headers: headers() }).then(handleResponse);
