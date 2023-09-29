import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_URL = 'http://localhost:8000/api/user';
if (localStorage.getItem('userInfo') === 'undefined') {
  localStorage.setItem('userInfo', '');
}
// setting initial state of the user Slice
const initialState = {
  message: '',
  statusCode: '',
  userInfo:null,
  userTweets: localStorage.getItem('userTweets')
    ? JSON.parse(localStorage.getItem('userTweets'))
    : [],
};

//Fetch User
export const fetchUser = createAsyncThunk('user/fetchUser', async (id) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('authInfo'));
    const response = await axios.get(`${USER_URL}/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
});

// action creators for reducer function
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatusCode: (state) => {
      state.statusCode = '';
      state.message = '';
    },
  },
  extraReducers(builder) {
    builder

      .addCase(fetchUser.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.userInfo = action.payload.user;
        state.userTweets = action.payload.tweets;
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        localStorage.setItem(
          'userTweets',
          JSON.stringify(action.payload.tweets)
        );
      });
  },
});

export const selectUserMessage = (state) => state.user.message;
export const selectUserStatusCode = (state) => state.user.statusCode;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserTweets = (state) => state.user.userTweets;
export const { setStatusCode } = userSlice.actions;
export default userSlice.reducer;
