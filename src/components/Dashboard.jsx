// components/Dashboard.js (Updated)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout } from '../utils/auth';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen themed-bg flex items-center justify-center">
        <div className="text-xl themed-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen themed-bg flex items-center justify-center">
        <div className="text-xl text-red-500 bg-red-100 px-6 py-4 rounded-lg border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen themed-bg">
      <nav className="themed-bg-light shadow-lg border-b themed-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold themed-brand">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="themed-text text-lg">
                Welcome, <span className="themed-brand font-medium">{profile?.username}</span>!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="themed-card border-2 border-dashed themed-border rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold themed-text-heavy mb-6">
                Welcome to your Dashboard!
              </h2>
              <div className="themed-card p-8 max-w-md mx-auto shadow-xl">
                <h3 className="text-2xl font-medium themed-brand mb-6">Profile Information</h3>
                <div className="space-y-4">
                  <div className="text-left">
                    <p className="text-lg">
                      <strong className="themed-text-heavy">Username:</strong>{' '}
                      <span className="themed-text">{profile?.username}</span>
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-lg">
                      <strong className="themed-text-heavy">Email:</strong>{' '}
                      <span className="themed-text">{profile?.email}</span>
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-lg">
                      <strong className="themed-text-heavy">User ID:</strong>{' '}
                      <span className="themed-text">{profile?.id}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
