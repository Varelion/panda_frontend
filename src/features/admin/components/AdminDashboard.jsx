import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../shared/components/layout/Header';

function AdminDashboard() {
  const [siteStatus, setSiteStatus] = useState('open');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', email: '', password: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');
    
    if (!adminToken || !adminUser) {
      navigate('/admin/login');
      return;
    }

    try {
      const user = JSON.parse(adminUser);
      if (!user.isAdmin) {
        navigate('/admin/login');
        return;
      }
    } catch (error) {
      navigate('/admin/login');
      return;
    }

    // Fetch current site status and users
    fetchSiteStatus();
    fetchUsers();
  }, [navigate]);

  const fetchSiteStatus = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:3001/api/auth/admin/site-status', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSiteStatus(data.status);
      } else {
        setError('Failed to fetch site status');
      }
    } catch (error) {
      console.error('Error fetching site status:', error);
      setError('Network error');
    }
  };

  const toggleSiteStatus = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:3001/api/auth/admin/toggle-site', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSiteStatus(data.status);
        setSuccess(data.message);
      } else {
        setError(data.message || 'Failed to toggle site status');
      }
    } catch (error) {
      console.error('Error toggling site status:', error);
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:3001/api/auth/admin/users', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Network error');
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({ username: user.username, email: user.email, password: '' });
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const adminToken = localStorage.getItem('adminToken');
      const updateData = {};
      
      if (editForm.username !== selectedUser.username) updateData.username = editForm.username;
      if (editForm.email !== selectedUser.email) updateData.email = editForm.email;
      if (editForm.password) updateData.password = editForm.password;

      if (Object.keys(updateData).length === 0) {
        setError('No changes detected');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:3001/api/auth/admin/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setShowEditModal(false);
        fetchUsers();
        setEditForm({ username: '', email: '', password: '' });
      } else {
        setError(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:3001/api/auth/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        fetchUsers();
      } else {
        setError(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="themed-card p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold themed-text-heavy">
                <span className="text-[#d1282e]">Admin Dashboard</span>
              </h1>
              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition-colors"
              >
                Logout
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                <p>{success}</p>
              </div>
            )}

            {/* Site Status Control */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">
                Site Status Control
              </h2>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg themed-text mb-2">
                    Current Status: 
                    <span className={`ml-2 font-bold ${siteStatus === 'open' ? 'text-green-600' : 'text-red-600'}`}>
                      {siteStatus === 'open' ? 'SITE OPEN' : 'SITE CLOSED'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {siteStatus === 'open' 
                      ? 'Players can access all features and place orders'
                      : 'Players will see the maintenance page with Discord link'
                    }
                  </p>
                </div>
                
                <button
                  onClick={toggleSiteStatus}
                  disabled={isLoading}
                  className={`px-8 py-4 rounded-lg font-bold text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${
                    siteStatus === 'open'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isLoading ? 'Updating...' : (siteStatus === 'open' ? 'Close Site' : 'Open Site')}
                </button>
              </div>
            </div>

            {/* Site Status Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-700 mb-3">Site Open</h3>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Players can browse the menu</li>
                  <li>• Orders can be placed</li>
                  <li>• All features are accessible</li>
                  <li>• Contact forms work normally</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-700 mb-3">Site Closed</h3>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• Shows maintenance page</li>
                  <li>• Displays "No delivery personnel available"</li>
                  <li>• Provides Discord link for updates</li>
                  <li>• All other pages redirect to maintenance</li>
                </ul>
              </div>
            </div>

            {/* Discord Info */}
            <div className="mt-8 bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-3">Discord Information</h3>
              <p className="text-sm text-blue-700 mb-2">
                <span className="font-bold">Discord Invite:</span> https://discord.gg/cXRfjVZ7XK
              </p>
              <p className="text-sm text-blue-700">
                This link is automatically displayed on the maintenance page when the site is closed.
              </p>
            </div>

            {/* User Management */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold themed-text-heavy mb-4">
                User Management
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Username</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Admin</th>
                      <th className="px-4 py-2 text-left">Tokens</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-100">
                        <td className="px-4 py-2">{user.id}</td>
                        <td className="px-4 py-2 font-medium">{user.username}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${user.is_admin ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                            {user.is_admin ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-4 py-2">{user.reward_tokens || 0}</td>
                        <td className="px-4 py-2">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Edit User Modal */}
            {showEditModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                  <h3 className="text-xl font-bold mb-4">Edit User: {selectedUser?.username}</h3>
                  
                  <form onSubmit={handleUpdateUser}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password (leave blank to keep current)
                      </label>
                      <input
                        type="password"
                        value={editForm.password}
                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new password..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? 'Updating...' : 'Update User'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;