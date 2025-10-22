import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-1">
          {task.title}
        </h3>
        <span
          className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getStatusStyles(task.status)}`}
        >
          {task.status.replace('_', ' ')}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
        {task.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 font-medium">Budget:</span>
          <span className="text-lg font-bold text-primary-600">${task.budget}</span>
        </div>
        {task.category && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 font-medium">Category:</span>
            <span className="text-sm text-gray-800 font-medium">{task.category}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 font-medium">Deadline:</span>
          <span className="text-sm text-gray-800 font-medium">{formatDate(task.deadline)}</span>
        </div>
      </div>

      {task.required_skills && task.required_skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {task.required_skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {task.required_skills.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{task.required_skills.length - 4} more
            </span>
          )}
        </div>
      )}

      <Link
        to={`/tasks/${task.id}`}
        className="mt-auto w-full py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-center font-medium"
      >
        View Details
      </Link>
    </div>
  );
};

export default TaskCard;
