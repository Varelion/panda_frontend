// src/features/ui/uiSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showMenuModal: false, // UI state for MenuModal
  // You can add other UI flags here
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowMenuModal: (state, action) => {
      state.showMenuModal = action.payload;
    },
  },
});

export const { setShowMenuModal } = uiSlice.actions;

export const selectShowMenuModal = (state) => state.ui.showMenuModal;

export default uiSlice.reducer;
