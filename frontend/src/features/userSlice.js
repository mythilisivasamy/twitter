import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const AUTH_URL = 'http://localhost:8000/api/auth';
if (localStorage.getItem('userInfo') === 'undefined') {
  localStorage.setItem('userInfo', '');
}
// setting initial state of the user Slice
const initialState = {
  message: '',
  statusCode: '',
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

// Creating login to the user
export const signup = createAsyncThunk('user/signup', async (newUser) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, newUser);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (updatedUser) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('userInfo'));
      const response = await axios.put(`${AUTH_URL}/profile`, updatedUser, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
// Authendicate login
export const login = createAsyncThunk('user/login', async (newUser) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, newUser);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

//Fetch Users
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));
    const response = await axios.get(`${USER_URL}/users`, {
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
    setToken: (state) => {
      state.token = '';
    },
    signout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state) => {
        state.message = 'Verifying';
        state.statusCode = '';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
        localStorage.removeItem('userInfo');
      })
      .addCase(signup.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = '';
      })
      .addCase(login.pending, (state) => {
        state.message = 'Verifying';
        state.statusCode = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload?.userInfo;
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
        localStorage.setItem(
          'userInfo',
          JSON.stringify(action.payload?.userInfo)
        );
        localStorage.removeItem('shippingAddress');
      })
      .addCase(login.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = '';
      })
      .addCase(updateProfile.pending, (state) => {
        state.message = 'Verifying';
        state.statusCode = '';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.statusCode = action.payload.statusCode;
        state.users = action.payload.users;
      });
  },
});

export const selectUserMessage = (state) => state.user.message;
export const selectUserStatusCode = (state) => state.user.statusCode;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectEmail = (state) => state.user.email;
export const selectPassword = (state) => state.user.password;
export const selectUsers = (state) => state.user.users;
export const { setStatusCode, setToken, signout } = userSlice.actions;
export default userSlice.reducer;
