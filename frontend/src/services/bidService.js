import api from './api';

const bidService = {
  // Get all bids for a task
  getTaskBids: async (taskId) => {
    const response = await api.get(`/bids/task/${taskId}`);
    return response.data;
  },

  // Create a new bid
  createBid: async (bidData) => {
    const response = await api.post('/bids', bidData);
    return response.data;
  },

  // Update a bid
  updateBid: async (bidId, bidData) => {
    const response = await api.put(`/bids/${bidId}`, bidData);
    return response.data;
  },

  // Accept a bid
  acceptBid: async (bidId) => {
    const response = await api.post(`/bids/${bidId}/accept`);
    return response.data;
  },
};

export default bidService;
