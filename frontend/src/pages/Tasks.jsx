import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import taskService from '../services/taskService';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    category: '',
  });

  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks(filters);
      setTasks(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h1>Browse Tasks</h1>
        {user?.user_type === 'client' && (
          <Link to="/tasks/create" className="create-task-button">
            Post a Task
          </Link>
        )}
      </div>

      <div className="tasks-filters">
        <div className="filter-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="Enter category"
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks found</p>
          {user?.user_type === 'client' && (
            <Link to="/tasks/create" className="create-task-link">
              Post your first task
            </Link>
          )}
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
