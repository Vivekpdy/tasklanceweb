import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BidCard from '../components/BidCard';
import taskService from '../services/taskService';
import bidService from '../services/bidService';
import { useAuth } from '../context/AuthContext';

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidFormData, setBidFormData] = useState({
    amount: '',
    proposed_deadline: '',
    cover_letter: '',
  });

  useEffect(() => {
    fetchTaskDetails();
    fetchBids();
  }, [id]);

  const fetchTaskDetails = async () => {
    try {
      const data = await taskService.getTaskById(id);
      setTask(data);
    } catch (err) {
      setError('Failed to load task details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const data = await bidService.getTaskBids(id);
      setBids(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load bids:', err);
    }
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      await bidService.createBid({
        task_id: id,
        ...bidFormData,
      });
      setShowBidForm(false);
      setBidFormData({
        amount: '',
        proposed_deadline: '',
        cover_letter: '',
      });
      fetchBids();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit bid');
    }
  };

  const handleAcceptBid = async (bidId) => {
    try {
      await bidService.acceptBid(bidId);
      fetchTaskDetails();
      fetchBids();
      alert('Bid accepted successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to accept bid');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        navigate('/tasks');
      } catch (err) {
        alert('Failed to delete task');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!task) return <div className="error-message">Task not found</div>;

  const isOwner = user?.id === task.client_id;
  const canBid = user?.user_type === 'freelancer' && task.status === 'open';

  return (
    <div className="task-details-page">
      <div className="task-details-container">
        <div className="task-details-header">
          <h1>{task.title}</h1>
          <span className="task-status">{task.status}</span>
        </div>

        <div className="task-details-content">
          <div className="task-info-section">
            <h3>Description</h3>
            <p>{task.description}</p>
          </div>

          <div className="task-meta">
            <div className="task-meta-item">
              <strong>Budget:</strong> ${task.budget}
            </div>
            {task.category && (
              <div className="task-meta-item">
                <strong>Category:</strong> {task.category}
              </div>
            )}
            <div className="task-meta-item">
              <strong>Deadline:</strong>{' '}
              {new Date(task.deadline).toLocaleDateString()}
            </div>
            {task.required_skills && task.required_skills.length > 0 && (
              <div className="task-meta-item">
                <strong>Required Skills:</strong>
                <div className="task-skills">
                  {task.required_skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isOwner && (
            <div className="task-actions">
              <button onClick={() => navigate(`/tasks/${id}/edit`)} className="btn-edit">
                Edit Task
              </button>
              <button onClick={handleDelete} className="btn-delete">
                Delete Task
              </button>
            </div>
          )}

          {canBid && !showBidForm && (
            <button onClick={() => setShowBidForm(true)} className="btn-bid">
              Submit a Bid
            </button>
          )}

          {showBidForm && (
            <form onSubmit={handleBidSubmit} className="bid-form">
              <h3>Submit Your Bid</h3>
              <div className="form-group">
                <label htmlFor="amount">Bid Amount ($)</label>
                <input
                  type="number"
                  id="amount"
                  value={bidFormData.amount}
                  onChange={(e) =>
                    setBidFormData({ ...bidFormData, amount: e.target.value })
                  }
                  required
                  min="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="proposed_deadline">Proposed Deadline</label>
                <input
                  type="date"
                  id="proposed_deadline"
                  value={bidFormData.proposed_deadline}
                  onChange={(e) =>
                    setBidFormData({
                      ...bidFormData,
                      proposed_deadline: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cover_letter">Cover Letter</label>
                <textarea
                  id="cover_letter"
                  value={bidFormData.cover_letter}
                  onChange={(e) =>
                    setBidFormData({
                      ...bidFormData,
                      cover_letter: e.target.value,
                    })
                  }
                  required
                  rows="5"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Submit Bid
                </button>
                <button
                  type="button"
                  onClick={() => setShowBidForm(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="bids-section">
        <h2>Bids ({bids.length})</h2>
        {bids.length === 0 ? (
          <p className="no-bids">No bids yet</p>
        ) : (
          <div className="bids-list">
            {bids.map((bid) => (
              <BidCard
                key={bid.id}
                bid={bid}
                onAccept={handleAcceptBid}
                isTaskOwner={isOwner}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
