import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../shared/components/layout/Header';

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store admin token
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen themed-bg">
      <Header />
      <main className="pt-8">
        <div className="max-w-md mx-auto px-4">
          <div className="themed-card p-8">
            <h1 className="text-3xl font-bold text-center themed-text-heavy mb-8">
              <span className="text-[#d1282e]">Admin Login</span>
            </h1>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium themed-text-heavy mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="Admin username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium themed-text-heavy mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
                  placeholder="Admin password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#d1282e] text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? 'Logging in...' : 'Login as Admin'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminLogin;