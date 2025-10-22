import api from './api';

const paymentService = {
  // Get all payments for a task
  getTaskPayments: async (taskId) => {
    const response = await api.get(`/payments/task/${taskId}`);
    return response.data;
  },

  // Create a new payment
  createPayment: async (paymentData) => {
    const response = await api.post('/payments', paymentData);
    return response.data;
  },

  // Update payment status
  updatePayment: async (paymentId, paymentData) => {
    const response = await api.put(`/payments/${paymentId}`, paymentData);
    return response.data;
  },
};

export default paymentService;
