import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';

const CreateTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    category: '',
    required_skills: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Web Development',
    'Mobile Development',
    'Design',
    'Writing',
    'Marketing',
    'Data Science',
    'DevOps',
    'Other',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const skillsArray = formData.required_skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill);

      const taskData = {
        ...formData,
        budget: parseFloat(formData.budget),
        required_skills: skillsArray,
      };

      const newTask = await taskService.createTask(taskData);
      navigate(`/tasks/${newTask.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create task');
      setLoading(false);
    }
  };

  return (
    <div className="create-task-page">
      <div className="create-task-container">
        <h1>Create New Task</h1>
        <p className="create-task-subtitle">
          Post a task and receive bids from talented freelancers
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="create-task-form">
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Build a responsive website"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="8"
              placeholder="Describe your project in detail..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="budget">Budget ($) *</label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                min="1"
                step="0.01"
                placeholder="500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Deadline *</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="required_skills">Required Skills</label>
            <input
              type="text"
              id="required_skills"
              name="required_skills"
              value={formData.required_skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB (comma-separated)"
            />
            <small className="form-help">
              Enter skills separated by commas
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
