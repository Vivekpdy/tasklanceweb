import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import taskService from '../services/taskService';
import bidService from '../services/bidService';
import TaskCard from '../components/TaskCard';
import BidCard from '../components/BidCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      if (user.user_type === 'client') {
        // Fetch tasks posted by client
        const tasksData = await taskService.getTasks();
        setTasks(Array.isArray(tasksData) ? tasksData : []);
      } else {
        // Fetch bids made by freelancer
        const tasksData = await taskService.getTasks();
        setTasks(Array.isArray(tasksData) ? tasksData : []);
        
        // For each task, get bids (this is a simplified version)
        // In real app, you'd have a specific endpoint for freelancer's bids
        const allBids = [];
        for (const task of tasksData.slice(0, 5)) {
          try {
            const taskBids = await bidService.getTaskBids(task.id);
            const myBids = taskBids.filter(bid => bid.freelancer_id === user.id);
            allBids.push(...myBids);
          } catch (err) {
            console.error('Failed to fetch bids for task:', task.id);
          }
        }
        setBids(allBids);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    if (user.user_type === 'client') {
      return {
        total: tasks.length,
        open: tasks.filter(t => t.status === 'open').length,
        in_progress: tasks.filter(t => t.status === 'in_progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
      };
    } else {
      return {
        total: bids.length,
        pending: bids.filter(b => b.status === 'pending').length,
        accepted: bids.filter(b => b.status === 'accepted').length,
        rejected: bids.filter(b => b.status === 'rejected').length,
      };
    }
  };

  const stats = getStats();

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.first_name}!</h1>
          <p className="dashboard-subtitle">
            {user?.user_type === 'client'
              ? 'Manage your tasks and find the best freelancers'
              : 'Track your bids and find new opportunities'}
          </p>
        </div>
        {user?.user_type === 'client' && (
          <Link to="/tasks/create" className="btn-create">
            Create New Task
          </Link>
        )}
      </div>

      <div className="stats-container">
        {user?.user_type === 'client' ? (
          <>
            <div className="stat-card">
              <h3>{stats.total}</h3>
              <p>Total Tasks</p>
            </div>
            <div className="stat-card">
              <h3>{stats.open}</h3>
              <p>Open</p>
            </div>
            <div className="stat-card">
              <h3>{stats.in_progress}</h3>
              <p>In Progress</p>
            </div>
            <div className="stat-card">
              <h3>{stats.completed}</h3>
              <p>Completed</p>
            </div>
          </>
        ) : (
          <>
            <div className="stat-card">
              <h3>{stats.total}</h3>
              <p>Total Bids</p>
            </div>
            <div className="stat-card">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
            <div className="stat-card">
              <h3>{stats.accepted}</h3>
              <p>Accepted</p>
            </div>
            <div className="stat-card">
              <h3>{stats.rejected}</h3>
              <p>Rejected</p>
            </div>
          </>
        )}
      </div>

      <div className="dashboard-content">
        {user?.user_type === 'client' ? (
          <div className="tasks-section">
            <h2>My Tasks</h2>
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>You haven't posted any tasks yet.</p>
                <Link to="/tasks/create" className="btn-primary">
                  Create Your First Task
                </Link>
              </div>
            ) : (
              <div className="tasks-grid">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
                onClick={() => setActiveTab('tasks')}
              >
                Available Tasks
              </button>
              <button
                className={`tab ${activeTab === 'bids' ? 'active' : ''}`}
                onClick={() => setActiveTab('bids')}
              >
                My Bids ({bids.length})
              </button>
            </div>

            {activeTab === 'tasks' ? (
              <div className="tasks-section">
                <h2>Available Tasks</h2>
                {tasks.length === 0 ? (
                  <p className="empty-state">No tasks available at the moment.</p>
                ) : (
                  <div className="tasks-grid">
                    {tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bids-section">
                <h2>My Bids</h2>
                {bids.length === 0 ? (
                  <div className="empty-state">
                    <p>You haven't placed any bids yet.</p>
                    <Link to="/tasks" className="btn-primary">
                      Browse Tasks
                    </Link>
                  </div>
                ) : (
                  <div className="bids-list">
                    {bids.map((bid) => (
                      <BidCard key={bid.id} bid={bid} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
