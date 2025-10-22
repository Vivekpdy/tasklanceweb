import api from './api';

const reviewService = {
  // Get all reviews for a user
  getUserReviews: async (userId) => {
    const response = await api.get(`/reviews/user/${userId}`);
    return response.data;
  },

  // Create a new review
  createReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },
};

export default reviewService;
