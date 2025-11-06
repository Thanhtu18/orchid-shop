import { configureStore } from '@reduxjs/toolkit';
import orchidsReducer from './slices/orchidsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    orchids: orchidsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});