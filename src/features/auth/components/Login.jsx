// Login component - handles user authentication
// React hooks for component state management
import React, { useState } from 'react';
// React Router hooks for navigation and linking between pages
import { useNavigate, Link } from 'react-router-dom';
// Authentication utility function for user signin (renamed from 'login' to 'signin')
import { signin } from '../../../shared/utils/auth';

/**
 * Login Component - User authentication form
 * 
 * Provides a form for existing users to sign in with email and password.
 * Handles form validation, API communication, and navigation after successful login.
 * 
 * Features:
 * - Form validation for email and password fields
 * - Loading states during authentication
 * - Error handling and display for failed login attempts
 * - Automatic navigation to dashboard after successful authentication
 */
const Login = () => {
  // Form data state containing user input for email and password
  const [formData, setFormData] = useState({ email: '', password: '' });
  // Error message state for displaying authentication failures to the user
  const [error, setError] = useState('');
  // Loading state to show spinner and disable form during API request
  const [loading, setLoading] = useState(false);
  // React Router navigation hook for redirecting after successful login
  const navigate = useNavigate();

  /**
   * Handles form submission for user authentication
   * Prevents default form behavior, calls signin API, and navigates on success
   * 
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior (page reload)
    e.preventDefault();
    // Set loading state to show spinner and disable form during request
    setLoading(true);
    // Clear any previous error messages
    setError('');

    try {
      // Call signin API with form data (email and password)
      // Note: Function renamed from 'login' to 'signin' for consistency
      await signin(formData);
      // Redirect to dashboard on successful authentication
      navigate('/dashboard');
    } catch (err) {
      // Display error message if login fails (invalid credentials, network error, etc.)
      setError(err.message);
    } finally {
      // Always clear loading state when request completes (success or failure)
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full border-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center chinese">Sign In</h2>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 bold-text">
            Warning: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all regular-text bg-white text-black"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all regular-text bg-white text-black"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#d1282e] text-white rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 shadow-lg extra-bold-text"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 regular-text">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#d1282e] hover:text-red-700 font-bold bold-text">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Login };
export default Login;
