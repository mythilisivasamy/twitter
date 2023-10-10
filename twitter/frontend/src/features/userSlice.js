import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_URL = 'http://localhost:8000/api/user';

// setting initial state of the user Slice
const initialState = {
  status: '',
  statusCode: '',
  users: localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : [],
};

//Fetch User
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem('authInfo'));
    const response = await axios.get(`${USER_URL}/`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
});

//follow user
export const followUser = createAsyncThunk('user/followUser', async (id) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('authInfo'));
    const response = await axios.put(
      `${USER_URL}/${id}/follow`,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profile) => {
    try {
     
      const { token } = JSON.parse(localStorage.getItem('authInfo'));
      const response = await axios.put(`${USER_URL}/profile`, profile, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log('res', response.data);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
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
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.statusCode = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.users = action.payload.users;
        console.log(state.users);
        localStorage.setItem('users', JSON.stringify(action.payload.users));
      })
      .addCase(followUser.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })

      .addCase(followUser.fulfilled, (state, action) => {
        state.status = action.payload.message;
        //let follow = action.payload.user;
        let follower = action.payload.follower;

        const filteredusers = state.users.filter(
          (user) => user._id !== follower._id
        );

        console.log('filteredusers', filteredusers);
      })
      .addCase(updateProfile.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.statusCode = action.payload.statusCode;
        const { _id } = action.payload.user;
        const users = state.users.filter((user) => user._id !== _id);
        state.users = [...users, action.payload.user];
        localStorage.setItem('users', JSON.stringify(state.users));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = '';
      });
  },
});

export const selectUserMessage = (state) => state.user.message;
export const selectStatus = (state) => state.user.status;
export const selectUsers = (state) => state.user.users;
export const selectUserById = (state, userId) =>
  state.user.users.find((user) => user._id === userId);

export const selectUserTweets = (state) => state.user.userTweets;
export const { setStatusCode } = userSlice.actions;
export default userSlice.reducer;
