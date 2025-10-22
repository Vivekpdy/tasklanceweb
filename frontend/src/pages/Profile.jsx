import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import reviewService from '../services/reviewService';
import ReviewCard from '../components/ReviewCard';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    skills: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        bio: user.bio || '',
        skills: Array.isArray(user.skills) ? user.skills.join(', ') : '',
      });
      fetchReviews();
    }
  }, [user]);

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getUserReviews(user.id);
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

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
      const skillsArray = formData.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill);

      const updateData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        bio: formData.bio,
        skills: skillsArray,
      };

      const updatedUser = await userService.updateUser(updateData);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      bio: user.bio || '',
      skills: Array.isArray(user.skills) ? user.skills.join(', ') : '',
    });
    setIsEditing(false);
    setError('');
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
          </div>
          <div className="profile-info">
            <h1>
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="profile-email">{user?.email}</p>
            <span className="profile-type">{user?.user_type}</span>
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              Edit Profile
            </button>
          )}
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <strong>Rating</strong>
            <span className="rating-value">
              {averageRating} {averageRating !== 'N/A' && '⭐'}
            </span>
          </div>
          <div className="stat-item">
            <strong>Reviews</strong>
            <span>{reviews.length}</span>
          </div>
          <div className="stat-item">
            <strong>Member Since</strong>
            <span>{new Date(user?.created_at).getFullYear()}</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB (comma-separated)"
              />
              <small>Enter skills separated by commas</small>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-cancel"
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-section">
              <h3>Bio</h3>
              <p>{user?.bio || 'No bio provided yet.'}</p>
            </div>

            <div className="detail-section">
              <h3>Skills</h3>
              {user?.skills && user.skills.length > 0 ? (
                <div className="skills-list">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p>No skills listed yet.</p>
              )}
            </div>
          </div>
        )}

        <div className="reviews-section">
          <h2>Reviews ({reviews.length})</h2>
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet</p>
          ) : (
            <div className="reviews-list">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
