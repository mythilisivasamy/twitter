import mongoose from 'mongoose';
const commentsSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  commentedAt: {
    type: Date,
  },
});

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tweetedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    comments: [commentsSchema],
    retweetBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Tweet = mongoose.model('tweet', tweetSchema);
export default Tweet;
