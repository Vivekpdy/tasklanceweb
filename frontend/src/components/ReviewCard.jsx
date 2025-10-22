const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-xl ${
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          {renderStars(review.rating)}
          <span className="text-lg font-bold text-gray-700">
            {review.rating}/5
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {formatDate(review.created_at)}
        </span>
      </div>

      {review.reviewer && (
        <div className="mb-3">
          <p className="text-base font-bold text-gray-900">
            {review.reviewer.first_name} {review.reviewer.last_name}
          </p>
          <p className="text-sm text-primary-600 capitalize">
            {review.reviewer.user_type}
          </p>
        </div>
      )}

      {review.comment && (
        <p className="text-gray-700 leading-relaxed mb-3">
          {review.comment}
        </p>
      )}

      {review.task && (
        <div className="pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Task:</span>{' '}
            <span className="text-gray-900">{review.task.title}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
