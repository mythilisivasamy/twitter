import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const AUTH_URL = 'http://localhost:8000/api/auth';
const USER_URL='http://localhost:8000/api/user'
if (localStorage.getItem('authInfo') === 'undefined') {
  localStorage.setItem('authInfo', '');
}
// setting initial state of the auth Slice
const initialState = {
  message: '',
  statusCode: '',
  authInfo: localStorage.getItem('authInfo')
    ? JSON.parse(localStorage.getItem('authInfo'))
    : null,
};

// Creating login to the auth
export const signup = createAsyncThunk('auth/signup', async (newauth) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, newauth);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (updatedauth) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('authInfo'));
      const response = await axios.put(`${AUTH_URL}/profile`, updatedauth, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
// Authendicate login
export const login = createAsyncThunk('auth/login', async (newauth) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, newauth);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

//Fetch auths
export const fetchUser = createAsyncThunk('auth/fetchUser', async (id) => {
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
const authSlice = createSlice({
  name: 'auth',
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
      state.authInfo = null;
      localStorage.removeItem('authInfo');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
        localStorage.removeItem('authInfo');
      })
      .addCase(signup.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = '';
      })
      .addCase(login.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authInfo = action.payload?.authInfo;
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
        localStorage.setItem(
          'authInfo',
          JSON.stringify(action.payload?.authInfo)
        );
        localStorage.removeItem('shippingAddress');
      })
      .addCase(login.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = '';
      })
      .addCase(updateProfile.pending, (state) => {
        state.message = 'loading';
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
      .addCase(fetchUser.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.statusCode = action.payload.statusCode;
        state.user = action.payload.user;
      });
  },
});

export const selectAuthMessage = (state) => state.auth.message;
export const selectAuthStatusCode = (state) => state.auth.statusCode;
export const selectAuthInfo = (state) => state.auth.authInfo;
export const selectEmail = (state) => state.auth.email;
export const selectPassword = (state) => state.auth.password;
export const selectUser=state=>state.auth.user;
export const { setStatusCode, setToken, signout } = authSlice.actions;
export default authSlice.reducer;
