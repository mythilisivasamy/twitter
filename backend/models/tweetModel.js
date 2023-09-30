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
      },
    ],
    comments: [commentsSchema],
    retweetBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
       
  },
  {
    timestamps: true,
  }
);
const Tweet = mongoose.model('tweet', tweetSchema);
const Comment = mongoose.model('comment', commentsSchema);
export default Tweet;
