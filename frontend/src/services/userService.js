import api from './api';

const userService = {
  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Update current user profile
  updateUser: async (userData) => {
    const response = await api.put('/users/me', userData);
    return response.data;
  },

  // Get user by ID
  getUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
};

export default userService;
