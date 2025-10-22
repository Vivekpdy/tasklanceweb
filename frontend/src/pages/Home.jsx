import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6">
            Welcome to <span className="text-primary-600">Tasklance</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect with talented freelancers or find your next exciting project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
                <Link
                  to="/tasks"
                  className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-xl hover:bg-primary-50 transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Browse Tasks
                </Link>
              </>
            ) : (
              <>
                {user.user_type === 'client' ? (
                  <Link
                    to="/tasks/create"
                    className="px-8 py-4 bg-secondary-600 text-white rounded-xl hover:bg-secondary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Post a Task
                  </Link>
                ) : (
                  <Link
                    to="/tasks"
                    className="px-8 py-4 bg-secondary-600 text-white rounded-xl hover:bg-secondary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Find Work
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-xl hover:bg-primary-50 transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Go to Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Tasklance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Find Perfect Match
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Connect with skilled freelancers who match your project needs perfectly
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Secure Payments
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Safe and secure payment system protects both clients and freelancers
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Quality Work
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Get access to vetted professionals with proven track records
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Create Account</h4>
              <p className="text-gray-600">Sign up as a client or freelancer</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Post or Browse</h4>
              <p className="text-gray-600">Post tasks or browse available projects</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Connect & Work</h4>
              <p className="text-gray-600">Connect with freelancers and start working</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                4
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Get Paid</h4>
              <p className="text-gray-600">Complete work and receive secure payment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of clients and freelancers already using Tasklance
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
