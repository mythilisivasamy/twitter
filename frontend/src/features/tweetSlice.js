import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const TWEET_URL = 'http://localhost:8000/api/tweet';
const initialState = {
  message: '',
  statusCode: '',
  tweets: localStorage.getItem('allTweets')
    ? JSON.parse(localStorage.getItem('allTweets'))
    : [],
};
export const createTweet = createAsyncThunk(
  'tweet/createTweet',
  async (newTweet) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('authInfo'));

      const response = await axios.post(`${TWEET_URL}/`, newTweet, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const createComment = createAsyncThunk(
  'tweet/createComment',
  async (newComment) => {
    try {
      console.log(newComment);
      const { token } = JSON.parse(localStorage.getItem('authInfo'));

      const response = await axios.post(`${TWEET_URL}/comment`, newComment, {
        headers: { authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchTweets = createAsyncThunk('/fetchTweets', async () => {
  try {
    const response = await axios.get(`${TWEET_URL}/`);
    return response.data;
  } catch (err) {
    return err.message;
  }
});
export const deleteTweet = createAsyncThunk('/deleteTweet', async (tweetId) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('authInfo'));
    const response = await axios.put(
      `${TWEET_URL}/${tweetId}/delete`,
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
export const likeTweet = createAsyncThunk('/likeTweet', async (tweetId) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('authInfo'));
    const response = await axios.put(
      `${TWEET_URL}/${tweetId}/like`,
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

// action creators for reducer function
const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    setStatusCode: (state) => {
      state.statusCode = '';
      state.message = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createTweet.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(createComment.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(fetchTweets.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
        state.tweets = action.payload.tweets;
        localStorage.setItem(
          'allTweets',
          JSON.stringify(action.payload.tweets)
        );
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.message = action.error.message;
        state.statusCode = '';
      })
      .addCase(likeTweet.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })
      .addCase(likeTweet.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      })
      .addCase(deleteTweet.pending, (state) => {
        state.message = 'loading';
        state.statusCode = '';
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
      });
  },
});
export const selectStatusCode = (state) => state.tweet.statusCode;
export const selectAllTweets = (state) => state.tweet.tweets;
export const { setStatusCode } = tweetSlice.actions;
export default tweetSlice.reducer;
