import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import { isAuthenticated, getProfile } from '../utils/auth';
import ThemeToggle from './ThemeToggle';

function AccountModal({ isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        try {
          const response = await getProfile();
          setUser(response.user);
        } catch (error) {
          console.error('Auth check failed:', error);
        }
      }
      setLoading(false);
    };

    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="max-w-4xl max-h-[90vh] min-w-[40vw] min-h-[600px] themed-card top-[50%] left-[50%] fixed translate-y-[-50%] translate-x-[-50%] rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-row justify-between items-center px-6 py-4 border-b themed-border">
          <h2 className="text-xl font-semibold themed-text">Account Portal</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-2xl themed-text hover:themed-brand rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="themed-bg overflow-y-auto min-h-fit max-h-[calc(90vh-80px)]">
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-lg themed-text">Loading...</div>
            </div>
          ) : user ? (
            <div className="p-6">
              <Dashboard user={user} onLogout={handleLogout} />
            </div>
          ) : (
            <div className="themed-bg min-h-full">
              {/* Authentication Forms - Remove outer container styling */}
              <div className="px-6 pb-6">
                {showSignup ? (
                  <div className="max-w-md mx-auto">
                    <Signup onLogin={handleLogin} switchToLogin={() => setShowSignup(false)} />
                  </div>
                ) : (
                  <div className="max-w-md mx-auto">
                    <Login onLogin={handleLogin} switchToSignup={() => setShowSignup(true)} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountModal;
