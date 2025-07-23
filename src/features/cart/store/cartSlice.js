import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  characterName: '',
  deliveryX: '',
  deliveryY: '',
  mapName: '',
  couponCode: '',
  showSecretMenu: false,
  orderSubmitted: false,
  tokensUsed: 0,
  userTokens: 0,
  specialInstructions: '',
  secretMenuTokensSpent: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      
      // Check if this is a secret menu item and if user has enough tokens
      if (item.tokenCost) {
        const totalTokensNeeded = state.secretMenuTokensSpent + item.tokenCost;
        if (totalTokensNeeded > state.userTokens) {
          // Don't add item if not enough tokens
          return;
        }
        // Track tokens spent on secret menu items
        state.secretMenuTokensSpent += item.tokenCost;
      }
      
      state.items.push(item);
    },
    removeFromCart: (state, action) => {
      const itemIndex = action.payload;
      const removedItem = state.items[itemIndex];
      
      // If removing a secret menu item, refund the token
      if (removedItem && removedItem.tokenCost) {
        state.secretMenuTokensSpent -= removedItem.tokenCost;
      }
      
      state.items = state.items.filter((_, index) => index !== itemIndex);
    },
    clearCart: (state) => {
      state.items = [];
      state.secretMenuTokensSpent = 0;
    },
    setCharacterName: (state, action) => {
      state.characterName = action.payload;
    },
    setDeliveryX: (state, action) => {
      state.deliveryX = action.payload;
    },
    setDeliveryY: (state, action) => {
      state.deliveryY = action.payload;
    },
    setMapName: (state, action) => {
      state.mapName = action.payload;
    },
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    setShowSecretMenu: (state, action) => {
      state.showSecretMenu = action.payload;
    },
    setOrderSubmitted: (state, action) => {
      state.orderSubmitted = action.payload;
    },
    setTokensUsed: (state, action) => {
      state.tokensUsed = action.payload;
    },
    setUserTokens: (state, action) => {
      state.userTokens = action.payload;
    },
    setSpecialInstructions: (state, action) => {
      state.specialInstructions = action.payload;
    },
    resetOrderForm: (state) => {
      state.characterName = '';
      state.deliveryX = '';
      state.deliveryY = '';
      state.mapName = '';
      state.couponCode = '';
      state.showSecretMenu = false;
      state.orderSubmitted = false;
      state.tokensUsed = 0;
      state.specialInstructions = '';
      state.items = [];
      state.secretMenuTokensSpent = 0;
    },
  },
});

// Export the actions exactly as defined in reducers
export const {
  addToCart,
  removeFromCart,
  clearCart,
  setCharacterName,
  setDeliveryX,
  setDeliveryY,
  setMapName,
  setCouponCode,
  setShowSecretMenu,
  setOrderSubmitted,
  setTokensUsed,
  setUserTokens,
  setSpecialInstructions,
  resetOrderForm,
} = cartSlice.actions;

// Selectors for cart slice state
export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) => state.cart.items.length;

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price, 0);

export const selectCharacterName = (state) => state.cart.characterName;

// Individual selectors for delivery coordinates and map name
export const selectDeliveryX = (state) => state.cart.deliveryX;

export const selectDeliveryY = (state) => state.cart.deliveryY;

export const selectMapName = (state) => state.cart.mapName;

// Combined delivery location selector for convenience
export const selectDeliveryLocation = (state) => ({
  x: state.cart.deliveryX,
  y: state.cart.deliveryY,
  map: state.cart.mapName,
});

export const selectCouponCode = (state) => state.cart.couponCode;

export const selectShowSecretMenu = (state) => state.cart.showSecretMenu;

export const selectOrderSubmitted = (state) => state.cart.orderSubmitted;

export const selectTokensUsed = (state) => state.cart.tokensUsed;

export const selectUserTokens = (state) => state.cart.userTokens;

export const selectSpecialInstructions = (state) => state.cart.specialInstructions;

export const selectSecretMenuTokensSpent = (state) => state.cart.secretMenuTokensSpent;

export default cartSlice.reducer;
