// React hooks for component lifecycle and memoized values
import React, { useEffect, useMemo } from 'react';
// Redux hooks for state management and dispatch actions
import { useSelector, useDispatch } from 'react-redux';
// Authentication selector to check if user is logged in
import { selectIsAuthenticated } from '../../auth';
// Cart-related action creators and selectors for managing shopping cart state
import {
  // Action creators for modifying cart state
  addToCart,               // Adds items to the shopping cart
  removeFromCart,          // Removes items from the shopping cart
  setCharacterName,        // Sets the customer's character name for delivery
  setDeliveryX,            // Sets X coordinate for delivery location
  setMapName,              // Sets the map name for delivery location
  setDeliveryY,            // Sets Y coordinate for delivery location
  setCouponCode,           // Sets the coupon code entered by user
  setShowSecretMenu,       // Shows/hides the secret menu items
  setOrderSubmitted,       // Marks order as submitted successfully
  resetOrderForm,          // Resets all form fields to initial state
  setTokensUsed,           // Sets number of reward tokens being used
  setUserTokens,           // Updates user's available token count
  setSpecialInstructions,  // Sets special delivery instructions
  // Selectors for accessing cart state from Redux store
  selectCartItems,         // Gets array of items in cart
  selectCartCount,         // Gets total number of items in cart
  selectCartTotal,         // Gets total price of all cart items
  selectCharacterName,     // Gets customer's character name
  selectDeliveryLocation,  // Gets delivery location (map, x, y coordinates)
  selectCouponCode,        // Gets current coupon code
  selectShowSecretMenu,    // Gets whether secret menu is visible
  selectOrderSubmitted,    // Gets order submission status
  selectTokensUsed,        // Gets number of tokens being used for order
  selectUserTokens,        // Gets user's available token balance
  selectSpecialInstructions, // Gets special delivery instructions
} from '../../cart';
// Menu component that displays food items available for ordering
import Menu from './Menu';
// API service for handling order-related HTTP requests
import { orderAPI } from '../../../shared/services/api';

/**
 * MenuModal - Main modal component for the Pandaren Express food ordering system
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback function to close the modal
 */
function MenuModal({ isOpen, onClose }) {
  // Redux dispatch function for triggering state changes
  const dispatch = useDispatch();

  // Extract all necessary state values from Redux store using selectors
  const cart = useSelector(selectCartItems);                    // Array of items added to cart
  const cartCount = useSelector(selectCartCount);               // Total number of items in cart
  const cartTotal = useSelector(selectCartTotal);               // Total price in gold
  const characterName = useSelector(selectCharacterName);       // Customer's WoW character name
  const deliveryLocation = useSelector(selectDeliveryLocation); // Object with map, x, y coordinates
  const couponCode = useSelector(selectCouponCode);             // Coupon code for secret menu access
  const showSecretMenu = useSelector(selectShowSecretMenu);     // Boolean for secret menu visibility
  const orderSubmitted = useSelector(selectOrderSubmitted);     // Order submission status
  const tokensUsed = useSelector(selectTokensUsed);             // Number of reward tokens being used
  const userTokens = useSelector(selectUserTokens);             // User's available token balance
  const specialInstructions = useSelector(selectSpecialInstructions); // Custom delivery instructions
  const isAuthenticated = useSelector(selectIsAuthenticated);   // User authentication status

  /**
   * Memoized calculation to ensure proper re-rendering when tokens change
   * This prevents unnecessary re-renders when other state changes but tokens remain the same
   */
  const availableTokens = useMemo(() => {
    return userTokens;
  }, [userTokens]);

  /**
   * Effect hook to load user's reward token balance when modal opens
   * This ensures we have up-to-date token information for each session
   */
  useEffect(() => {
    const loadUserTokens = async () => {
      try {
        // API call to fetch user's current reward token balance
        const response = await orderAPI.getUserTokens();
        // Update Redux state with the fetched token count
        dispatch(setUserTokens(response.reward_tokens));
      } catch (error) {
        console.error('Failed to load user tokens:', error);
      }
    };

    // Only load tokens when modal is actually opened to avoid unnecessary API calls
    if (isOpen) {
      loadUserTokens();
    }
  }, [isOpen, dispatch]);

  /**
   * Effect hook to automatically reveal secret menu when tokens are used
   * This provides immediate feedback when user applies tokens to their order
   */
  useEffect(() => {
    if (tokensUsed > 0 && isAuthenticated) {
      dispatch(setShowSecretMenu(true));
    }
  }, [tokensUsed, isAuthenticated, dispatch]);

  /**
   * Handles coupon code submission and validation
   * Currently only supports 'pandaren' code to unlock secret menu
   */
  const handleCouponSubmit = () => {
    // Check if entered coupon matches the secret code (case-insensitive)
    if (couponCode.toLowerCase() === 'pandaren') {
      // Unlock the secret menu for custom orders
      dispatch(setShowSecretMenu(true));
    }
  };

  /**
   * Handles adding items to the shopping cart with token validation
   * @param {Object} item - The menu item to add (contains name, price, tokenCost if applicable)
   */
  const handleAddToCart = (item) => {
    // Validate token requirements for secret menu items
    if (item.tokenCost) {
      const totalTokensNeeded = secretMenuTokensSpent + item.tokenCost;
      if (totalTokensNeeded > userTokens) {
        alert(`Not enough tokens! You need ${item.tokenCost} token(s) for this item. You have ${userTokens - secretMenuTokensSpent} tokens available.`);
        return;
      }
    }

    // Add the item to cart via Redux action
    dispatch(addToCart(item));
  };

  /**
   * Handles removing items from the shopping cart
   * @param {number} index - Array index of the item to remove
   */
  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleSubmitOrder = async () => {
    if (
      !characterName ||
      !deliveryLocation.x ||
      !deliveryLocation.y ||
      !deliveryLocation.map ||
      cart.length === 0
    ) {
      alert('Please fill in all required fields and add at least one item to your cart');
      return;
    }

    // Check if using tokens and validate
    if (tokensUsed > 0 && tokensUsed > userTokens) {
      alert(`You don't have enough tokens. You need ${tokensUsed} tokens but only have ${userTokens}.`);
      return;
    }

    const orderData = {
      total_amount: cartTotal,
      delivery_address: `${deliveryLocation.map} - (${deliveryLocation.x}, ${deliveryLocation.y})`,
      notes: `Character: ${characterName}`,
      special_instructions: specialInstructions,
      items: cart.map((item) => ({
        name: item.name,
        quantity: 1,
        price: item.price,
      })),
      character_name: characterName,
      delivery_location: deliveryLocation,
      coupon_used: showSecretMenu ? 'pandaren' : null,
      tokens_used: tokensUsed || 0,
    };

    try {
      const response = await orderAPI.createOrder(orderData);
      console.log('Order created successfully:', response);

      // Update user tokens in state (deduct custom order tokens)
      if (tokensUsed > 0) {
        dispatch(setUserTokens(userTokens - tokensUsed));
      }

      // Send Discord notification if webhook URL is available
      try {
        const WEB_HOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
        if (WEB_HOOK_URL) {
          const embed = {
            title: 'New Pandaren Food Order!',
            color: 0xd1282e,
            fields: [
              { name: 'Character', value: characterName, inline: true },
              { name: 'Map', value: deliveryLocation.map, inline: true },
              {
                name: 'Coordinates',
                value: `(${deliveryLocation.x}, ${deliveryLocation.y})`,
                inline: true,
              },
              {
                name: 'Items',
                value: cart.map((item) => `• ${item.name}`).join('\n'),
                inline: false,
              },
              { name: 'Special Instructions', value: specialInstructions || 'None', inline: false },
              { name: 'Total', value: `${cartTotal} gold`, inline: true },
              { name: 'Coupon', value: orderData.coupon_used || 'None', inline: true },
              { name: 'Custom Tokens', value: tokensUsed || 0, inline: true },
              { name: 'Order Time', value: new Date().toLocaleString(), inline: true },
            ],
            footer: { text: 'Pandaren Express Delivery Service' },
            timestamp: new Date().toISOString(),
          };

          await fetch(WEB_HOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] }),
          });
        }
      } catch (error) {
        console.error('Failed to send Discord notification:', error);
      }

      dispatch(setOrderSubmitted(true));
    } catch (error) {
      console.error('Failed to create order:', error);
      alert(`Failed to create order: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  if (orderSubmitted) {
    return (
      <div className="fixed inset-0 z-50  ">
        <div className="max-w-2xl max-h-[90vh] min-w-[40vw] min-h-[600px] bg-white top-[50%] left-[50%] fixed translate-y-[-50%] translate-x-[-50%] rounded-lg shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-[#d1282e] px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white chinese">
              Order Confirmed!
            </h2>
            <button
              onClick={() => {
                dispatch(resetOrderForm());
                onClose();
              }}
              className="text-white border-1 border-white rounded-xl w-[3rem] h-[3rem] hover:text-yellow-300 hover:border-yellow-400 bg-[#d1282e] hover:bg-red-500 duration-300 transition-color ease-in-out select-none"
            >
              x
            </button>
          </div>

          {/* Content */}
          <div className="p-8 text-center bg-gradient-to-br from-green-50 to-green-100">
            {/* Success Icon - Green checkmark circle to indicate successful order */}
            <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl text-white">✓</span>
            </div>

            {/* Success Message */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4 extra-bold-text">
              Your Pandaren feast is on the way!
            </h3>

            {/* Order Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-left">
              <h4 className="font-bold text-gray-800 mb-4 chinese text-center">Order Summary</h4>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-bold text-gray-600">Character:</span>
                  <span className="font-bold text-gray-800">{characterName}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-bold text-gray-600">Delivery Map:</span>
                  <span className="font-bold text-gray-800">{deliveryLocation.map}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-bold text-gray-600">Coordinates:</span>
                  <span className="font-bold text-gray-800">
                    ({deliveryLocation.x}, {deliveryLocation.y})
                  </span>
                </div>

                <div className="py-2">
                  <span className="font-bold text-gray-600 block mb-2">Items Ordered:</span>
                  <div className="bg-gray-50 rounded p-3 space-y-1">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-800">{item.name}</span>
                        <span className="font-bold text-[#d1282e]">{item.price}G</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-t-2 border-[#d1282e]  select-none">
                  <span className="font-bold text-lg text-gray-800 select-none">Total:</span>
                  <span className="font-bold text-2xl text-[#d1282e] extra-bold-text  select-none">
                    {cartTotal} GOLD
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Info - Shows estimated delivery time and notification method */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 font-medium">
                <strong>Estimated Delivery:</strong> 15-30 minutes
                <br />
                You'll receive a whisper when you order is on its way!
              </p>
            </div>

            {/* Fun Message */}
            <p className="text-gray-600 italic mb-4">
              "May your hunger be satisfied and your chi be restored!" - Master Chen
            </p>

            {/* Loading Animation */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-[#d1282e] rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-[#d1282e] rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className="w-3 h-3 bg-[#d1282e] rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></div>
            </div>
            <p className="text-gray-500 text-sm mt-2  select-none">Preparing your order...</p>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render the main menu modal interface
   * This is the primary ordering interface with menu items, cart, and checkout form
   */
  return (
    // {/* Modal overlay - dark background that covers the entire screen */}
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)]">
      {/* Main modal container - large centered window for the ordering interface */}
      <div className="max-w-6xl max-h-[90vh] min-w-[60vw] min-h-[700px] bg-white top-[50%] left-[50%] fixed translate-y-[-50%] translate-x-[-50%] rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        {/* Header section - contains title and close button */}
        <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-gray-200 bg-[#d1282e]">
          <h2 className="text-xl font-bold text-white chinese select-none">
            Pandaren Express Delivery
          </h2>
          {/* Close button - X button to close the modal */}
          <button
            onClick={onClose}
            className="text-white border-1 border-white rounded-xl w-[3rem] h-[3rem] hover:text-yellow-300 hover:border-yellow-400 bg-[#d1282e] hover:bg-red-500 duration-300 transition-color ease-in-out select-none"
          >
            x
          </button>
        </div>

        {/* Main content area - scrollable container for all modal content */}
        <div className="bg-gray-50 overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          {/* Grid layout - 2/3 for menu content, 1/3 for order summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - contains menu items, coupon section, and secret menu */}
            <div className="lg:col-span-2">
              {/* Traditional menu section - displays regular food items */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 chinese select-none">
                  Traditional Pandaren Menu
                </h3>
                {/* Menu component container - renders the actual food items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
                  <Menu />
                </div>
              </div>

              {/* Coupon code section - allows users to enter secret codes */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 chinese select-none">
                  Coupon Code
                </h3>
                {/* Coupon input form - text input and unlock button */}
                <div className="flex gap-2 select-none">
                  {/* Coupon code input field */}
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => dispatch(setCouponCode(e.target.value))}
                    placeholder="Enter secret coupon code..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                  {/* Unlock button - validates and applies coupon code */}
                  <button
                    onClick={handleCouponSubmit}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-sm"
                  >
                    UNLOCK
                  </button>
                </div>
              </div>

              {/* Secret menu section - only visible when unlocked via coupon or tokens */}
              {showSecretMenu && (
                <div className="mb-6">
                  {/* Secret menu header with token balance */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-purple-600 chinese">
                      Custom Order Unlocked!
                    </h3>
                    {/* Shows user's available token balance */}
                    <div className="text-sm text-purple-600 font-medium">
                      Available: {availableTokens} tokens
                    </div>
                  </div>
                  {/* Custom order form - allows users to request anything they want */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 p-6 rounded-lg shadow-md">
                    <h4 className="font-bold text-purple-700 mb-2 bold-text">
                      Custom Order - Tell us what you want!
                    </h4>
                    <p className="text-sm text-purple-600 mb-4 regular-text">
                      Describe anything you'd like us to deliver. Use your imagination!
                    </p>
                    {/* Large text area for custom order descriptions */}
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => dispatch(setSpecialInstructions(e.target.value))}
                      placeholder="I want a massage, a hug, or anything else you can imagine..."
                      rows="4"
                      className="w-full px-4 py-3 border border-purple-300 rounded-lg bg-white text-gray-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right column - order summary, form fields, and checkout */}
            <div className="lg:col-span-1">
              {/* Order summary card - sticky positioned for easy access while scrolling */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 sticky top-0">
                <h3 className="text-lg font-bold text-gray-800 mb-4 chinese  select-none">
                  Your Order
                </h3>

                {/* Character name input - required field for delivery identification */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2 bold-text">
                    Character Name *
                  </label>
                  <input
                    type="text"
                    value={characterName}
                    onChange={(e) => dispatch(setCharacterName(e.target.value))}
                    placeholder="Enter your character name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                {/* Map name input - specifies which game world/zone for delivery */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2 bold-text">
                    Map Name *
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation.map}
                    onChange={(e) => dispatch(setMapName(e.target.value))}
                    placeholder="e.g. Stormwind City, Orgrimmar"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                {/* Coordinate inputs - X and Y coordinates for precise delivery location */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2 bold-text">
                    Delivery Coordinates *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* X coordinate input */}
                    <input
                      type="number"
                      value={deliveryLocation.x}
                      onChange={(e) => {
                        const val = e.target.value;
                        dispatch(setDeliveryX(val === '' ? '' : Number(val)));
                      }}
                      placeholder="X coordinate"
                      className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100"
                      required
                    />

                    {/* Y coordinate input */}
                    <input
                      type="number"
                      value={deliveryLocation.y}
                      onChange={(e) => {
                        const val = e.target.value;
                        dispatch(setDeliveryY(val === '' ? '' : Number(val)));
                      }}
                      placeholder="Y coordinate"
                      className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100"
                      required
                    />
                  </div>
                </div>

                {/* Special instructions textarea - optional field for custom requests */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2 bold-text">
                    Special Instructions
                  </label>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => dispatch(setSpecialInstructions(e.target.value))}
                    placeholder="Special delivery instructions? Special dietary restrictions or requests?"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-[#d1282e] focus:outline-none focus:ring-2 focus:ring-red-100 resize-none"
                  />
                </div>

                {/* Shopping cart display - shows items added to cart with remove buttons */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-gray-800 bold-text">
                      My Bag ({cartCount} items)
                    </h4>
                    {/* Token balance display - shows available tokens for authenticated users */}
                    <div className={`text-sm font-bold ${isAuthenticated && userTokens > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                      {isAuthenticated ? userTokens : 0} Available
                      {!isAuthenticated && <span className="text-xs block">(Login required)</span>}
                    </div>
                  </div>
                  {/* Cart items display - empty state or list of cart items */}
                  {cartCount === 0 ? (
                    // {/* Empty cart message */}
                    <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                      Your bag is empty
                    </p>
                  ) : (
                    // Cart items list - scrollable container for multiple items
                    <div className="space-y-2 max-h-32 overflow-y-auto bg-gray-50 p-3 rounded-lg">
                      {cart.map((item, index) => (
                        // Individual cart item with name, price, and remove button
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm bg-white p-2 rounded shadow-sm"
                        >
                          <span className="text-gray-800 font-medium">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[#d1282e] font-bold">{item.price}G</span>
                            {/* Remove item button */}
                            <button
                              onClick={() => handleRemoveFromCart(index)}
                              className="text-red-500 hover:text-red-700 w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-50"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Token Usage Section - allows users to apply reward tokens for custom orders */}
                <div className={`mb-4 p-4 rounded-lg border select-none ${
                  isAuthenticated
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  {/* Token section title - changes color based on authentication status */}
                  <h5 className={`font-bold mb-2 select-none ${
                    isAuthenticated ? 'text-blue-800' : 'text-gray-500'
                  }`}>
                    Use Reward Tokens
                  </h5>
                  {/* Token usage explanation - different text for authenticated vs unauthenticated users */}
                  <p className={`text-xs mb-3 select-none ${
                    isAuthenticated ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {isAuthenticated
                      ? 'Use tokens for "Custom Order ;)" - Ask us to deliver anything!'
                      : 'Login required to earn or use tokens'
                    }
                  </p>
                  {/* Token application controls */}
                  <div className="flex items-center gap-3">
                    {/* Token toggle button - applies or removes token usage */}
                    <button
                      onClick={() => dispatch(setTokensUsed(tokensUsed > 0 ? 0 : 1))}
                      disabled={!isAuthenticated || userTokens < 1}
                      className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                        tokensUsed > 0 && isAuthenticated
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                          : isAuthenticated && userTokens >= 1
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 border-2 border-dashed border-gray-400'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                      }`}
                    >
                      {tokensUsed > 0 ? 'Token Applied' : 'Apply Token'}
                    </button>
                    {/* Token applied confirmation - only shown when token is active */}
                    {tokensUsed > 0 && isAuthenticated && (
                      <span className="text-xs text-green-600 font-medium">= Custom Order ;)</span>
                    )}
                    {/* Available token count display */}
                    {isAuthenticated && (
                      <span className={`text-sm ${
                        userTokens >= 1 ? 'text-blue-700' : 'text-red-500'
                      }`}>
                        {userTokens} available
                      </span>
                    )}
                  </div>
                  {/* Warning message when user has no tokens */}
                  {userTokens < 1 && isAuthenticated && (
                    <p className="text-xs text-red-500 mt-2">No tokens available for custom orders</p>
                  )}
                </div>

                {/* Checkout section - order total and place order button */}
                <div className="border-t border-gray-200 pt-4">
                  {/* Order total display */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-gray-800 bold-text">Total:</span>
                    <span className="font-bold text-xl text-[#d1282e] extra-bold-text  select-none">
                      {cartTotal} GOLD
                      {/* Custom order indicator when token is applied */}
                      {tokensUsed > 0 && (
                        <span className="text-sm text-blue-600 block">+ Custom Order ;)</span>
                      )}
                    </span>
                  </div>
                  {/* Place order button - disabled when required fields are missing or insufficient tokens */}
                  <button
                    onClick={handleSubmitOrder}
                    disabled={
                      !characterName ||                    // Character name is required
                      !deliveryLocation.x ||               // X coordinate is required
                      !deliveryLocation.y ||               // Y coordinate is required
                      !deliveryLocation.map ||             // Map name is required
                      cartCount === 0 ||                   // At least one item must be in cart
                      (tokensUsed > userTokens)            // User must have sufficient tokens if using any
                    }
                    className="w-full px-6 py-4 bg-[#d1282e] text-white rounded-lg font-bold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg extra-bold-text text-lg"
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export MenuModal as the default export for use in other components
export default MenuModal;
