import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Tasklance
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/tasks"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Browse Tasks
            </Link>

            {isAuthenticated ? (
              <>
                {user?.user_type === 'client' && (
                  <Link
                    to="/tasks/create"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Post a Task
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Profile
                </Link>
                <div className="flex items-center space-x-4 pl-4 border-l border-gray-300">
                  <span className="text-sm text-gray-600">
                    Hi, <span className="font-semibold text-gray-800">{user?.first_name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/tasks"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse Tasks
            </Link>
            {isAuthenticated ? (
              <>
                {user?.user_type === 'client' && (
                  <Link
                    to="/tasks/create"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Post a Task
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600 px-4 mb-2">
                    Hi, <span className="font-semibold text-gray-800">{user?.first_name}</span>
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-center font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
