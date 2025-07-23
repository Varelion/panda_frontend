// Signup component - handles new user registration
// React hooks for component state management
import React, { useState } from 'react';
// React Router hooks for navigation and linking between pages
import { useNavigate, Link } from 'react-router-dom';
// Authentication utility function for user registration
import { signup } from '../../../shared/utils/auth';

/**
 * Signup Component - User registration form
 * 
 * Provides a form for new users to create accounts with username, email, and password.
 * Handles form validation, API communication, and navigation after successful signup.
 * 
 * Features:
 * - Form validation for required fields
 * - Loading states during API calls
 * - Error handling and display
 * - Automatic navigation to dashboard after successful registration
 */
const Signup = () => {
  // Form data state containing user input for username, email, and password
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  // Error message state for displaying signup failures to the user
  const [error, setError] = useState('');
  // Loading state to show spinner and disable form during API request
  const [loading, setLoading] = useState(false);
  // React Router navigation hook for redirecting after successful signup
  const navigate = useNavigate();

  /**
   * Handles form submission for user registration
   * Prevents default form behavior, calls signup API, and navigates on success
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
      // Call signup API with form data (username, email, password)
      await signup(formData);
      // Redirect to dashboard on successful account creation
      navigate('/dashboard');
    } catch (err) {
      // Display error message if signup fails (duplicate username, validation errors, etc.)
      setError(err.message);
    } finally {
      // Always clear loading state when request completes (success or failure)
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full border-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center chinese">Sign Up</h2>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 bold-text">
            Warning: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
              Username
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all regular-text bg-white text-black"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
              Email <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all regular-text bg-white text-black"
              placeholder="Enter your email address (optional)"
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
              placeholder="Create a secure password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50 shadow-lg extra-bold-text"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 regular-text">
            Already have an account?{' '}
            <Link to="/login" className="text-[#d1282e] hover:text-red-700 font-bold bold-text">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
export { Signup };
