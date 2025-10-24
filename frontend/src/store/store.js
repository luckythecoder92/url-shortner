import { configureStore } from '@reduxjs/toolkit';
import urlReducer from './slices/urlSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    url: urlReducer,
    auth: authReducer,
  },
});