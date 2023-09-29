import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import tweetReducer from '../features/tweetSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    tweet: tweetReducer,
    
  },
});
export default store;
