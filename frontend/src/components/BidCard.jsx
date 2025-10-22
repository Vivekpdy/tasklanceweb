const BidCard = ({ bid, onAccept, isTaskOwner }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {bid.freelancer && (
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">
                {bid.freelancer.first_name} {bid.freelancer.last_name}
              </h4>
              {bid.freelancer.rating > 0 && (
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {bid.freelancer.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyles(bid.status)}`}
        >
          {bid.status}
        </span>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">Bid Amount:</span>
          <span className="text-xl font-bold text-primary-600">${bid.amount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">Proposed Deadline:</span>
          <span className="text-sm font-semibold text-gray-900">{formatDate(bid.proposed_deadline)}</span>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="text-sm font-bold text-gray-700 mb-2">Cover Letter:</h5>
        <p className="text-gray-600 leading-relaxed text-sm">
          {bid.cover_letter}
        </p>
      </div>

      {isTaskOwner && bid.status === 'pending' && (
        <button
          className="w-full py-2.5 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors duration-200 font-medium"
          onClick={() => onAccept(bid.id)}
        >
          Accept Bid
        </button>
      )}
    </div>
  );
};

export default BidCard;
