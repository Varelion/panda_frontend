import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, ShoppingBag, Settings, LogOut, Shield } from 'lucide-react';
import {
  selectIsAuthenticated,
  selectUser,
  selectIsAdmin,
  selectAuthLoading,
  selectAuthError,
  setCredentials,
  logout,
  setLoading,
  setError,
  clearError,
} from '../../../auth';
import { orderAPI } from '../../../../shared/services/api';
import { signin, signup, getProfile, changePassword } from '../../../../shared/utils/auth';

function UserAccountModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'login', 'signup', 'profile', 'change-password'
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [userTokens, setUserTokens] = useState(0);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadUserProfile();
    }
  }, [isOpen, isAuthenticated]);

  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      setCurrentView('menu');
    } else if (isOpen && isAuthenticated) {
      setCurrentView('profile');
    }
  }, [isOpen, isAuthenticated]);

  const loadUserProfile = async () => {
    try {
      // Load user tokens
      const tokensResponse = await orderAPI.getUserTokens();
      setUserTokens(tokensResponse.reward_tokens);

      // Load user orders
      const ordersResponse = await orderAPI.getUserOrders();
      setUserOrders(ordersResponse.orders);
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await signin({
        email: formData.email,
        password: formData.password,
      });

      dispatch(setCredentials({
        user: response.user,
        token: response.token,
      }));

      setCurrentView('profile');
      setFormData({ email: '', username: '', password: '', confirmPassword: '' });
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(setError('Passwords do not match'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      dispatch(setCredentials({
        user: response.user,
        token: response.token,
      }));

      setCurrentView('profile');
      setFormData({ email: '', username: '', password: '', confirmPassword: '' });
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      dispatch(setError('New passwords do not match'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setCurrentView('profile');
      dispatch(setError('Password changed successfully!'));

      // Clear success message after 3 seconds
      setTimeout(() => dispatch(clearError()), 3000);
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setCurrentView('menu');
    setUserTokens(0);
    setUserOrders([]);
    onClose();
  };

  const openAdminPanel = () => {
    window.open('/admin.html', '_blank');
  };

  if (!isOpen) return null;

  const renderMenu = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center chinese">Account</h2>
      <div className="space-y-4">
        <button
          onClick={() => setCurrentView('login')}
          className="w-full px-6 py-3 bg-[#d1282e] text-white rounded-lg font-bold hover:bg-red-700 transition-colors extra-bold-text shadow-lg select-none"
        >
          Sign In
        </button>
        <button
          onClick={() => setCurrentView('signup')}
          className="w-full px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition-colors extra-bold-text shadow-lg select-none"
        >
          Sign Up
        </button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentView('menu')}
          className="text-[#d1282e] hover:text-red-700 mr-4 font-medium bold-text select-none border-1- border-red-800"
        >
          ← Back
        </button>
        <h2 className="select-none text-2xl font-bold text-gray-800 chinese">Sign In</h2>
      </div>

      {authError && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 bold-text">
          Warning: {authError}
        </div>
      )}

      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
            Username
          </label>
          <input
            type="text"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all regular-text bg-white text-black"
            placeholder="Enter your email or username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
            🔒 Password
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
          disabled={authLoading}
          className="w-full px-6 py-3 bg-[#d1282e] text-white rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 shadow-lg extra-bold-text"
        >
          {authLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600 regular-text">
          Don't have an account?{' '}
          <button
            onClick={() => setCurrentView('signup')}
            className="text-[#d1282e] hover:text-red-700 font-bold bold-text"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );

  const renderSignUp = () => (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentView('menu')}
          className="text-[#d1282e] hover:text-red-700 mr-4 font-medium bold-text  select-none border-1- border-red-800"
        >
          ← Back
        </button>
        <h2 className="select-none text-2xl font-bold text-gray-800 chinese">Sign Up</h2>
      </div>

      {authError && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 bold-text">
          Warning: {authError}
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
            👤 Username
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
            📧 Email <span className="text-gray-500 font-normal">(optional)</span>
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
            🔒 Password
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
            🔒 Confirm Password
          </label>
          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all regular-text bg-white text-black"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="submit"
          disabled={authLoading}
          className="w-full px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50 shadow-lg extra-bold-text"
        >
          {authLoading ? '🔄 Creating Account...' : '🎉 Create Account'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600 regular-text">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentView('login')}
            className="text-[#d1282e] hover:text-red-700 font-bold bold-text"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 chinese">🐼 Profile</h2>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 text-[#d1282e] hover:bg-red-50 rounded-lg transition-colors bold-text"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* User Info */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-200 text-red-800">
          <div className="flex items-center space-x-3 mb-3">
            <User className="w-5 h-5 text-[#d1282e]" />
            <h3 className="font-bold text-gray-800 bold-text">Account Information</h3>
          </div>
          <div className="space-y-2">
            <p className="regular-text"><span className="font-medium bold-text">👤 Username:</span> {user?.username}</p>
            <p className="regular-text"><span className="font-medium bold-text">📧 Email:</span> {user?.email || 'Not provided'}</p>
            {isAdmin && (
              <p className="flex items-center space-x-2 text-green-600 bold-text">
                <Shield className="w-4 h-4" />
                <span className="font-medium">🛡️ Administrator</span>
              </p>
            )}
          </div>
        </div>

        {/* Reward Tokens */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[#d1282e] bold-text">🪙 Reward Tokens</h3>
            <span className="text-3xl font-bold text-[#d1282e] extra-bold-text">{userTokens}</span>
          </div>
          <p className="text-sm text-gray-700 regular-text">
            💫 Use tokens to get custom orders delivered! Earn more by completing orders.
          </p>
        </div>

        {/* Recent Orders */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <ShoppingBag className="w-5 h-5 text-[#d1282e]" />
            <h3 className="font-bold text-gray-800 bold-text">📦 Recent Orders</h3>
          </div>
          {userOrders.length === 0 ? (
            <p className="text-gray-500 text-sm regular-text">🍜 No orders yet - time for your first Pandaren feast!</p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {userOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="bg-white rounded-lg p-3 border-2 border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium bold-text">🥡 Order #{order.id}</p>
                      <p className="text-xs text-gray-500 regular-text">
                        📅 {new Date(order.order_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#d1282e] extra-bold-text">
                        💰 {order.total_amount} GOLD
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status === 'delivered' ? '✅' : order.status === 'pending' ? '⏳' : '🔄'} {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-800 flex items-center space-x-2 bold-text">
                <Settings className="w-5 h-5" />
                <span>⚙️ Account Settings</span>
              </h3>
              <p className="text-sm text-blue-600 regular-text">
                🔐 Manage your password and security settings
              </p>
            </div>
            <button
              onClick={() => setCurrentView('change-password')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg bold-text"
            >
              🔑 Change Password
            </button>
          </div>
        </div>

        {/* Admin Panel Access */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-green-800 flex items-center space-x-2 bold-text">
                  <Shield className="w-5 h-5" />
                  <span>🛡️ Admin Panel</span>
                </h3>
                <p className="text-sm text-green-600 regular-text">
                  🔧 Manage orders, users, and system settings
                </p>
              </div>
              <button
                onClick={openAdminPanel}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg bold-text"
              >
                🚀 Open Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderChangePassword = () => (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentView('profile')}
          className="text-[#d1282e] hover:text-red-700 mr-4 font-medium bold-text  select-none border-1- border-red-800"
        >
          ← Back to Profile
        </button>
        <h2 className="text-2xl font-bold text-gray-800 chinese">🔑 Change Password</h2>
      </div>

      {authError && (
        <div
          className={`px-4 py-3 rounded-lg mb-4 bold-text border-2 ${
            authError.includes('successfully')
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {authError.includes('successfully') ? '✅' : '⚠️'} {authError}
        </div>
      )}

      <form onSubmit={handleChangePassword} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
            🔒 Current Password
          </label>
          <input
            type="password"
            required
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all regular-text bg-white text-black"
            placeholder="Enter your current password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
            🔐 New Password
          </label>
          <input
            type="password"
            required
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all regular-text bg-white text-black"
            placeholder="Enter your new password"
          />
          <p className="text-xs text-gray-500 mt-1 regular-text">
            💡 Password must contain uppercase, lowercase, numbers, and special characters
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 bold-text">
            🔐 Confirm New Password
          </label>
          <input
            type="password"
            required
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all regular-text bg-white text-black"
            placeholder="Confirm your new password"
          />
        </div>
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={() => {
              setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
              setCurrentView('profile');
              dispatch(clearError());
            }}
            className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition-colors shadow-lg extra-bold-text"
          >
            ❌ Cancel
          </button>
          <button
            type="submit"
            disabled={authLoading}
            className="flex-1 px-6 py-3 bg-[#d1282e] text-white rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 shadow-lg extra-bold-text"
          >
            {authLoading ? '🔄 Changing...' : '✅ Change Password'}
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <h4 className="font-bold text-blue-800 mb-2 bold-text">🛡️ Password Security Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1 regular-text">
          <li>• Use at least 8 characters with mixed case letters</li>
          <li>• Include numbers and special characters (!@#$%^&*)</li>
          <li>• Avoid common words or personal information</li>
          <li>• Don't reuse passwords from other accounts</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        className={`w-full bg-white fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-lg shadow-2xl overflow-hidden ${
          currentView === 'profile' ? ' min-h-[80vh] max-w-[60vw]' :
          currentView === 'change-password' ? ' min-h-[70vh] max-w-[40vw]' : '  max-w-[20vw]'
        }`}
      >
        {/* Header */}
        <div className="bg-[#d1282e] px-6 py-4 flex justify-between items-center">
          <h2 className="text-3xl text-white chinese">
            {currentView === 'menu' && '🐼 Account'}
            {currentView === 'login' && 'Sign In'}
            {currentView === 'signup' && 'Sign Up'}
            {currentView === 'profile' && `${user?.username}`}
            {currentView === 'change-password' && '🔑 Change Password'}
          </h2>
          <button
            onClick={onClose}
            className="text-4xl hover:text-yellow-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors text-white select-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className={currentView === 'profile select-none' ? '' : ''}>
          {!isAuthenticated && currentView === 'menu' && renderMenu()}
          {!isAuthenticated && currentView === 'login' && renderLogin()}
          {!isAuthenticated && currentView === 'signup' && renderSignUp()}
          {isAuthenticated && currentView === 'profile' && renderProfile()}
          {isAuthenticated && currentView === 'change-password' && renderChangePassword()}
        </div>
      </div>
    </div>
  );
}

export default UserAccountModal;
