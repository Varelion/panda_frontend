import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '../features/counter';
import { carouselReducer } from '../features/carousel';
import { cartReducer } from '../features/cart';
import { authReducer } from '../features/auth';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    mesmerizingCarousel: carouselReducer,
    cart: cartReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

export default store;
