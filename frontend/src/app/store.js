import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import tweetReducer from '../features/tweetSlice';
import userReducer from '../features/userSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    tweet: tweetReducer,
    user: userReducer,
  },
});
export default store;
