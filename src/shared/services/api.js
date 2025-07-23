// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

// Order-related API methods
export const orderAPI = {
  createOrder: (orderData) => apiService.post('/api/orders', orderData),
  getUserOrders: () => apiService.get('/api/orders'),
  getUserTokens: () => apiService.get('/api/orders/user/tokens'),
  getOrderById: (id) => apiService.get(`/api/orders/${id}`),
};

// Admin-related API methods
export const adminAPI = {
  // Orders
  getAllOrders: () => apiService.get('/api/orders/admin/all'),
  markOrderComplete: (orderId, tokensToAward) => 
    apiService.patch(`/api/orders/admin/${orderId}/complete`, { tokens_to_award: tokensToAward }),
  updateOrderStatus: (orderId, status) => 
    apiService.patch(`/api/orders/admin/${orderId}/status`, { status }),
  deleteOrder: (orderId) => apiService.delete(`/api/orders/${orderId}`),
  
  // Users
  getAllUsers: () => apiService.get('/api/auth/admin/users'),
  updateUser: (userId, userData) => 
    apiService.patch(`/api/auth/admin/users/${userId}`, userData),
  deleteUser: (userId) => apiService.delete(`/api/auth/admin/users/${userId}`),
  updateUserTokens: (userId, tokens) => 
    apiService.patch(`/api/auth/admin/users/${userId}/tokens`, { tokens }),
};

export const apiService = new ApiService();
export default apiService;
