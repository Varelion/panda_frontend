// React core imports - useState for managing component state, useEffect for side effects
import React, { useState, useEffect } from 'react';
// Lucide React icons - provides scalable vector icons for the UI
import { Users, ShoppingBag, Settings, Trash2, Edit3, Award, Plus, X } from 'lucide-react';
// Admin API service - handles all backend communication for admin operations
import { adminAPI } from '../../../../shared/services/api';

/**
 * AdminDashboard Component
 * 
 * Main dashboard for administrators to manage orders and users.
 * Provides functionality to view, edit, delete, and update the status of orders and users.
 * Features tabbed navigation between Orders Management and Users Management.
 */
function AdminDashboard() {
  // Tab management state - controls which section (orders/users) is currently active
  const [activeTab, setActiveTab] = useState('orders');
  
  // Orders data state - stores the list of all orders fetched from the backend
  const [orders, setOrders] = useState([]);
  
  // Users data state - stores the list of all users fetched from the backend
  const [users, setUsers] = useState([]);
  
  // Loading state - indicates when API calls are in progress to show loading UI
  const [loading, setLoading] = useState(true);
  
  // Error state - stores error messages from failed API calls for user feedback
  const [error, setError] = useState(null);
  
  // User editing state - stores the ID of the user currently being edited (null if none)
  const [editingUser, setEditingUser] = useState(null);
  
  // Edit form data state - stores the form data when editing a user
  const [editFormData, setEditFormData] = useState({});
  
  // Password field visibility state - controls whether password change field is shown
  const [showPasswordField, setShowPasswordField] = useState(false);

  /**
   * Loads all orders from the backend API
   * 
   * Sets loading state, makes API call, and handles success/error states.
   * On success: populates orders state and clears any previous errors.
   * On error: sets error message and logs to console for debugging.
   * Always sets loading to false when complete.
   */
  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllOrders();
      setOrders(response.orders);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Loads all users from the backend API
   * 
   * Sets loading state, makes API call, and handles success/error states.
   * On success: populates users state and clears any previous errors.
   * On error: sets error message and logs to console for debugging.
   * Always sets loading to false when complete.
   */
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllUsers();
      setUsers(response.users);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Loads data based on the currently active tab
   * 
   * This function determines which data to load based on the activeTab state.
   * Called when refreshing data or when the active tab changes.
   */
  const loadData = () => {
    if (activeTab === 'orders') {
      loadOrders();
    } else if (activeTab === 'users') {
      loadUsers();
    }
  };

  /**
   * Effect hook that runs when the activeTab changes
   * 
   * This ensures that when a user switches between tabs, the appropriate data
   * is loaded automatically. Runs on component mount and whenever activeTab changes.
   */
  useEffect(() => {
    loadData();
  }, [activeTab]);

  /**
   * Handles marking an order as complete and awarding tokens to the customer
   * 
   * @param {number} orderId - The ID of the order to complete
   * 
   * Prompts admin for number of tokens to award, validates input,
   * calls API to mark order complete, and refreshes the orders list.
   * Shows success/error messages to provide feedback to the admin.
   */
  const handleCompleteOrder = async (orderId) => {
    const tokensToAward = prompt('How many tokens to award for this order?', '10');
    if (tokensToAward === null) return;

    const tokens = parseInt(tokensToAward);
    if (isNaN(tokens) || tokens < 0) {
      alert('Please enter a valid number of tokens');
      return;
    }

    try {
      await adminAPI.markOrderComplete(orderId, tokens);
      alert(`Order marked as complete! ${tokens} tokens awarded.`);
      loadOrders(); // Reload orders to reflect the updated status
    } catch (err) {
      alert(`Failed to complete order: ${err.message}`);
    }
  };

  /**
   * Updates the status of a specific order
   * 
   * @param {number} orderId - The ID of the order to update
   * @param {string} newStatus - The new status to set (e.g., 'confirmed', 'preparing', 'ready')
   * 
   * Calls the API to update order status, shows feedback message,
   * and refreshes the orders list to reflect changes.
   */
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus);
      alert(`Order status updated to ${newStatus}`);
      loadOrders(); // Reload orders to show updated status
    } catch (err) {
      alert(`Failed to update order status: ${err.message}`);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
      await adminAPI.deleteOrder(orderId);
      alert('Order deleted successfully');
      loadOrders();
    } catch (err) {
      alert(`Failed to delete order: ${err.message}`);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user.id);
    setEditFormData({
      username: user.username,
      email: user.email || '',
      reward_tokens: user.reward_tokens || 0,
      password: '',
    });
    setShowPasswordField(false);
  };

  const handleSaveUser = async (userId) => {
    try {
      const updateData = {
        username: editFormData.username,
        email: editFormData.email,
      };

      // Include password only if it's been set
      if (editFormData.password && editFormData.password.trim() !== '') {
        updateData.password = editFormData.password;
      }

      await adminAPI.updateUser(userId, updateData);
      
      // Update tokens separately if changed
      const originalUser = users.find(u => u.id === userId);
      if (originalUser && editFormData.reward_tokens !== originalUser.reward_tokens) {
        await adminAPI.updateUserTokens(userId, editFormData.reward_tokens);
      }
      
      alert('User updated successfully');
      setEditingUser(null);
      setShowPasswordField(false);
      loadUsers();
    } catch (err) {
      alert(`Failed to update user: ${err.message}`);
    }
  };

  /**
   * Deletes a user after admin confirmation
   * 
   * @param {number} userId - The ID of the user to delete
   * 
   * Shows strong confirmation dialog warning about permanent deletion.
   * If confirmed, calls API to delete user and refreshes the list.
   * Provides feedback on success or failure.
   */
  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      await adminAPI.deleteUser(userId);
      alert('User deleted successfully');
      loadUsers();
    } catch (err) {
      alert(`Failed to delete user: ${err.message}`);
    }
  };

  /**
   * Cancels user editing and resets all edit-related state
   * 
   * Exits edit mode without saving changes, clears form data,
   * and hides password field. Returns the user row to view mode.
   */
  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditFormData({});
    setShowPasswordField(false);
  };

  // Loading state render - shown while API calls are in progress
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
          <div className="text-center py-8">Loading data...</div>
        </div>
      </div>
    );
  }

  // Error state render - shown when API calls fail
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Error: {error}</p>
            <button 
              onClick={loadOrders}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard render - shows tabbed interface with orders and users management
  return (
    <div className="h-screen bg-gradient-to-br from-red-50 to-yellow-50 p-4 flex flex-col">
      <div className="max-w-7xl mx-auto flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-[#d1282e] chinese">Admin Dashboard</h1>
          <button 
            onClick={loadData}
            className="px-6 py-3 bg-[#d1282e] text-white rounded-lg hover:bg-red-700 font-bold shadow-lg extra-bold-text transition-colors"
          >
            Refresh Data
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-2xl mb-4 flex-shrink-0 border-2 border-gray-200">
          <div className="flex border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-2 px-6 py-4 font-bold bold-text ${
                activeTab === 'orders'
                  ? 'border-b-3 border-[#d1282e] text-[#d1282e] bg-red-50'
                  : 'text-gray-600 hover:text-[#d1282e] hover:bg-gray-50'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Orders Management</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center space-x-2 px-6 py-4 font-bold bold-text ${
                activeTab === 'users'
                  ? 'border-b-3 border-[#d1282e] text-[#d1282e] bg-red-50'
                  : 'text-gray-600 hover:text-[#d1282e] hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Users Management</span>
            </button>
          </div>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <>
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-2xl p-8 text-center border-2 border-gray-200">
                <p className="text-gray-500 text-lg bold-text">No orders found</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-2xl p-6 border-2 border-gray-200 hover:border-[#d1282e] transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-[#d1282e] text-lg extra-bold-text">Order #{order.id}</h3>
                    <p className="text-sm text-gray-700 bold-text">User: {order.username || order.email}</p>
                    <p className="text-sm text-gray-700 bold-text">Character: {order.character_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 bold-text">Total: {order.total_amount} GOLD</p>
                    <p className="text-sm text-gray-700 bold-text">Tokens Used: {order.tokens_used || 0}</p>
                    <p className="text-sm text-gray-700 bold-text">Date: {new Date(order.order_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 bold-text">Status: 
                      <span className={`ml-1 px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status === 'delivered' ? 'COMPLETE' : order.status === 'pending' ? 'PENDING' : 'IN PROGRESS'} {order.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700 bold-text">
                      Delivered: {order.delivered ? 'Yes' : 'No'}
                    </p>
                    {order.tokens_awarded > 0 && (
                      <p className="text-sm text-green-600 bold-text">Tokens Awarded: {order.tokens_awarded}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 bold-text">Delivery: {order.delivery_address}</p>
                    {order.delivery_location && (
                      <p className="text-sm text-gray-700 bold-text">
                        Location: {typeof order.delivery_location === 'string' 
                          ? order.delivery_location 
                          : JSON.stringify(order.delivery_location)}
                      </p>
                    )}
                  </div>
                </div>

                {order.items && order.items.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                    <div className="bg-gray-50 rounded p-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{item.name} (x{item.quantity})</span>
                          <span className="font-medium">{item.price}G</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {!order.delivered && (
                    <button
                      onClick={() => handleCompleteOrder(order.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-bold shadow-lg transition-colors bold-text"
                    >
                      Mark Complete & Award Tokens
                    </button>
                  )}
                  
                  {order.status !== 'delivered' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-bold shadow-md transition-colors bold-text"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'preparing')}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm font-bold shadow-md transition-colors bold-text"
                      >
                        Preparing
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'ready')}
                        className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-bold shadow-md transition-colors bold-text"
                      >
                        Ready
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="px-3 py-1 bg-[#d1282e] text-white rounded-lg hover:bg-red-700 text-sm font-bold shadow-md transition-colors bold-text"
                  >
                        Delete
                  </button>
                </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

    {/* Users Tab */}
    {activeTab === 'users' && (
      <>
        {users.length === 0 ? (
          <div className="bg-white rounded-lg shadow-2xl p-8 text-center border-2 border-gray-200">
            <p className="text-gray-500 text-lg bold-text">No users found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex-1 flex flex-col min-h-0 border-2 border-gray-200">
            <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-yellow-50 border-b-2 border-gray-200">
              <h2 className="text-xl font-bold text-[#d1282e] chinese">Users ({users.length})</h2>
            </div>
            <div className="overflow-auto flex-1">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-[#d1282e] uppercase tracking-wider bold-text">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-[#d1282e] uppercase tracking-wider bold-text">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-[#d1282e] uppercase tracking-wider bold-text">
                      Tokens
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-[#d1282e] uppercase tracking-wider bold-text">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-[#d1282e] uppercase tracking-wider bold-text">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUser === user.id ? (
                          <input
                            type="text"
                            value={editFormData.username}
                            onChange={(e) => setEditFormData({...editFormData, username: e.target.value})}
                            className="text-sm font-medium text-gray-900 border rounded px-2 py-1"
                          />
                        ) : (
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            <div className="text-sm text-gray-500">ID: {user.id}</div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUser === user.id ? (
                          <input
                            type="email"
                            value={editFormData.email}
                            onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                            className="text-sm text-gray-900 border rounded px-2 py-1"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">{user.email || 'No email provided'}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUser === user.id ? (
                          <div className="space-y-2">
                            <input
                              type="number"
                              min="0"
                              value={editFormData.reward_tokens}
                              onChange={(e) => setEditFormData({...editFormData, reward_tokens: parseInt(e.target.value) || 0})}
                              className="text-sm text-blue-600 font-bold border rounded px-2 py-1 w-20"
                            />
                            <div>
                              {!showPasswordField ? (
                                <button
                                  onClick={() => setShowPasswordField(true)}
                                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                                >
                                  Change Password
                                </button>
                              ) : (
                                <div className="space-y-1">
                                  <input
                                    type="password"
                                    placeholder="New password"
                                    value={editFormData.password}
                                    onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                                    className="text-sm border rounded px-2 py-1 w-32"
                                  />
                                  <button
                                    onClick={() => {
                                      setShowPasswordField(false);
                                      setEditFormData({...editFormData, password: ''});
                                    }}
                                    className="text-xs text-gray-600 hover:text-gray-800 underline ml-2"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-blue-600 font-bold">
                            {user.reward_tokens || 0} tokens
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.is_admin 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.is_admin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingUser === user.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSaveUser(user.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    )}
      </div>
    </div>
  );
}

// Export the AdminDashboard component as the default export
export default AdminDashboard;