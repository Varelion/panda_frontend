import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './app/store';
import { 
  selectIsAuthenticated, 
  selectIsAdmin, 
  selectUser,
  setCredentials 
} from './features/auth';
import { getProfile } from './shared/utils/auth';
import AdminDashboard from './features/admin/components/AdminDashboard/index.jsx';
import './assets/styles/globals.css';

function AdminApp() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const user = useSelector(selectUser);

  useEffect(() => {
    const loadUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token && !user) {
        try {
          const response = await getProfile();
          dispatch(setCredentials({
            user: response.user,
            token: token,
          }));
        } catch (error) {
          console.error('Failed to load user profile:', error);
          localStorage.removeItem('token');
        }
      }
    };

    loadUserProfile();
  }, [dispatch, user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center border-2 border-gray-200">
          <h1 className="text-3xl font-bold text-[#d1282e] mb-4 chinese">🔒 Admin Access Required</h1>
          <p className="text-gray-600 mb-6 regular-text">
            🚫 You need to be logged in with an admin account to access this page.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-[#d1282e] text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg extra-bold-text"
          >
            🏠 Go to Main Site
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center border-2 border-gray-200">
          <h1 className="text-3xl font-bold text-[#d1282e] mb-4 chinese">🚫 Access Denied</h1>
          <p className="text-gray-600 mb-2 regular-text">
            Hello <strong className="text-[#d1282e] bold-text">{user?.username}</strong>! 👋
          </p>
          <p className="text-gray-600 mb-6 regular-text">
            🛡️ You don't have administrator privileges to access this dashboard.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-[#d1282e] text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg extra-bold-text"
          >
            🏠 Go to Main Site
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

ReactDOM.createRoot(document.getElementById('admin-root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AdminApp />
    </Provider>
  </React.StrictMode>
);