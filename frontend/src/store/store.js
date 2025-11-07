import { configureStore } from '@reduxjs/toolkit';
import urlReducer from './slices/urlSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    url: urlReducer,
    auth: authReducer,
  },
});

export default store