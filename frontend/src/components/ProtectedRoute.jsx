import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredUserType }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredUserType && user.user_type !== requiredUserType) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
