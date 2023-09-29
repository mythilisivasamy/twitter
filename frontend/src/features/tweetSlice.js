import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const TWEET_URL = 'http://localhost:8000/api/tweet';
const initialState = {
  message: '',
  status: '',
  statusCode: '',
  tweets: [],
};
export const createTweet = createAsyncThunk(
  'tweet/createTweet',
  async (newTweet) => {
    try {
      console.log('new Tweet', newTweet);
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
export const likeTweet = createAsyncThunk(
  'tweet/likeTweet',
  async (tweetId) => {
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
  }
);
export const reTweet = createAsyncThunk('tweet/reTweet', async (tweetId) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('authInfo'));
    const response = await axios.put(
      `${TWEET_URL}/${tweetId}/retweet`,
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
        state.status = 'loading';
        state.statusCode = '';
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.statusCode = action.payload.statusCode;
        console.log(action.payload.tweet);
        state.tweets.push(action.payload.tweet);
      })
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
        state.statusCode = '';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.statusCode = action.payload.statusCode;
        const { _id } = action.payload.commentedTweet;
        const tweets = state.tweets.filter((t) => t._id !== _id);
        state.tweets = [...tweets, action.payload.commentedTweet];
      })
      .addCase(fetchTweets.pending, (state) => {
        state.status = 'loading';
        state.statusCode = '';
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.statusCode = action.payload.statusCode;
        state.tweets = action.payload.tweets;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.status = action.error.message;
        state.statusCode = '';
      })
      .addCase(likeTweet.pending, (state) => {
        state.status = 'loading';
        state.statusCode = '';
      })
      .addCase(likeTweet.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.statusCode = action.payload.statusCode;
        const { _id } = action.payload.likedTweet;
        const tweets = state.tweets.filter((t) => t._id !== _id);
        state.tweets = [...tweets, action.payload.likedTweet];
      })
      .addCase(reTweet.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.statusCode = action.payload.statusCode;
        const { _id } = action.payload.reTweeted;
        const tweets = state.tweets.filter((t) => t._id !== _id);
        state.tweets = [...tweets, action.payload.reTweeted];
      })
      .addCase(deleteTweet.pending, (state) => {
        state.status = 'loading';
        state.statusCode = '';
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.statusCode = action.payload.statusCode;
        const { _id } = action.payload.deletedTweet;
        const tweets = state.tweets.filter((t) => t._id !== _id);
        state.tweets = tweets;
      });
  },
});
export const selectStatus = (state) => state.tweet.status;
export const selectAllTweets = (state) => state.tweet.tweets;
export const { setStatusCode } = tweetSlice.actions;
export default tweetSlice.reducer;
