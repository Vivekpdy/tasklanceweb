import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: 'freelancer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create Your Account
            </h2>
            <p className="mt-2 text-gray-600">
              Join Tasklance and start your journey
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Min. 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                I want to...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  formData.user_type === 'freelancer'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-300'
                }`}>
                  <input
                    type="radio"
                    name="user_type"
                    value="freelancer"
                    checked={formData.user_type === 'freelancer'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <span className="text-2xl block mb-1">💼</span>
                    <span className="text-sm font-semibold text-gray-900">Find Work</span>
                  </div>
                  {formData.user_type === 'freelancer' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                </label>

                <label className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  formData.user_type === 'client'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-300'
                }`}>
                  <input
                    type="radio"
                    name="user_type"
                    value="client"
                    checked={formData.user_type === 'client'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <span className="text-2xl block mb-1">🎯</span>
                    <span className="text-sm font-semibold text-gray-900">Hire Talent</span>
                  </div>
                  {formData.user_type === 'client' && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
