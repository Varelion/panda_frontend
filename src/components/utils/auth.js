const API_URL = 'http://localhost:3001/api';

// Get token from localStorage
export const getToken = () => localStorage.getItem('token');

// Set token in localStorage
export const setToken = (token) => localStorage.setItem('token', token);

// Remove token from localStorage
export const removeToken = () => localStorage.removeItem('token');

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// API call helper with authentication
export const apiCall = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

// Auth functions
export const signup = async (userData) => {
  const response = await apiCall('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (response.token) {
    setToken(response.token);
  }

  return response;
};

export const signin = async (credentials) => {
  const response = await apiCall('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.token) {
    setToken(response.token);
  }

  return response;
};

export const logout = () => {
  removeToken();
};

export const getProfile = async () => {
  return apiCall('/auth/profile');
};
