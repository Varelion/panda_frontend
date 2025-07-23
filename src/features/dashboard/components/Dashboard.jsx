// --------------------------
//#region src/components/dashboard/Dashboard.jsx
// --------------------------

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout, getOrders, createOrder, updateOrderStatus, deleteOrder } from '../../../shared/utils/auth';
import LoadingBar from '../../../shared/components/ui/LoadingBar';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    total_amount: '',
    delivery_address: '',
    notes: '',
    items: [{ name: '', quantity: 1, price: '' }]
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, ordersResponse] = await Promise.all([
          getProfile(),
          getOrders()
        ]);
        setProfile(profileResponse.user);
        setOrders(ordersResponse.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        ...orderForm,
        total_amount: parseFloat(orderForm.total_amount),
        items: orderForm.items.map(item => ({
          ...item,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price)
        }))
      };

      await createOrder(orderData);
      const ordersResponse = await getOrders();
      setOrders(ordersResponse.orders || []);
      setShowOrderForm(false);
      setOrderForm({
        total_amount: '',
        delivery_address: '',
        notes: '',
        items: [{ name: '', quantity: 1, price: '' }]
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      const ordersResponse = await getOrders();
      setOrders(ordersResponse.orders || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      const ordersResponse = await getOrders();
      setOrders(ordersResponse.orders || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const addOrderItem = () => {
    setOrderForm({
      ...orderForm,
      items: [...orderForm.items, { name: '', quantity: 1, price: '' }]
    });
  };

  const updateOrderItem = (index, field, value) => {
    const updatedItems = [...orderForm.items];
    updatedItems[index][field] = value;
    setOrderForm({ ...orderForm, items: updatedItems });
  };

  const removeOrderItem = (index) => {
    const updatedItems = orderForm.items.filter((_, i) => i !== index);
    setOrderForm({ ...orderForm, items: updatedItems });
  };

  const renderContent = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex flex-col">
      <nav className="bg-[#d1282e] shadow-lg border-b-2 border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white chinese">🐼 Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white text-lg regular-text">
                Welcome, <span className="text-yellow-300 font-bold bold-text">{profile?.username || 'User'}</span>! 👋
              </span>
              <button
                onClick={handleLogout}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg bold-text"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6 flex-1 max-h-[calc(100vh-120px)] overflow-y-auto">
          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="text-blue-800">Loading dashboard data...</div>
            </div>
          )}

          {/* Profile Section */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-[#d1282e] mb-4 chinese">👤 Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                <p className="text-sm text-gray-700 font-bold bold-text">👤 Username</p>
                <p className="text-lg text-gray-900 font-bold extra-bold-text">{profile?.username || '...'}</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                <p className="text-sm text-gray-700 font-bold bold-text">📧 Email</p>
                <p className="text-lg text-gray-900 regular-text">{profile?.email || 'Not provided'}</p>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700 font-bold bold-text">🆔 User ID</p>
                <p className="text-lg text-gray-900 regular-text">{profile?.id || '...'}</p>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-2xl flex-1 min-h-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#d1282e] chinese">🥡 Order History</h3>
              <button
                onClick={() => setShowOrderForm(!showOrderForm)}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-lg font-bold transition-colors shadow-lg extra-bold-text"
                disabled={loading}
              >
                {showOrderForm ? '❌ Cancel' : '➕ New Order'}
              </button>
            </div>

            {/* Order Form */}
            {showOrderForm && !loading && (
              <form onSubmit={handleCreateOrder} className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-medium mb-4">Create New Order</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={orderForm.total_amount}
                      onChange={(e) => setOrderForm({ ...orderForm, total_amount: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Delivery Address</label>
                    <input
                      type="text"
                      value={orderForm.delivery_address}
                      onChange={(e) => setOrderForm({ ...orderForm, delivery_address: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Notes</label>
                  <textarea
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Order Items</label>
                    <button
                      type="button"
                      onClick={addOrderItem}
                      className="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      + Add Item
                    </button>
                  </div>

                  {orderForm.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Item name"
                        required
                        value={item.name}
                        onChange={(e) => updateOrderItem(index, 'name', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        required
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateOrderItem(index, 'quantity', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        required
                        value={item.price}
                        onChange={(e) => updateOrderItem(index, 'price', e.target.value)}
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {orderForm.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOrderItem(index)}
                          className="text-red-500 hover:text-red-600 px-3 py-2"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Create Order
                </button>
              </form>
            )}

            {/* Orders List */}
            {!loading && (
              <>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No orders found. Create your first order!</p>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-medium select-none">Order #{order.id}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(order.order_date).toLocaleDateString()} - ${order.total_amount}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                              className="px-3 py-1 border rounded text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="text-red-500 hover:text-red-600 text-sm px-2 py-1"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {order.delivery_address && (
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Delivery:</strong> {order.delivery_address}
                          </p>
                        )}

                        {order.notes && (
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Notes:</strong> {order.notes}
                          </p>
                        )}

                        {order.items && order.items.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Items:</p>
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <div key={index} className="text-sm text-gray-600 flex justify-between">
                                  <span>{item.name} x{item.quantity}</span>
                                  <span>${item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );

  if (loading) {
    return (
      <>
        <LoadingBar isLoading={true} />
        {renderContent()}
      </>
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

  return renderContent();
};

export default Dashboard;
export { Dashboard };


// --------------------------
//#endregion src/components/dashboard/Dashboard.jsx
// --------------------------
