import express from 'express';
import User from '../models/userModel.js';
import Tweet from '../models/tweetModel.js';
import { isAuth } from '../middleware/protectedRoute.js';
import asyncHandler from 'express-async-handler';
const tweetRouter = express.Router();

//Tweets API

tweetRouter.get(
  '/:id/tweets',
  asyncHandler(async (req, res) => {
    const tweets = await Tweet.find({ tweetedBy: req.params.id });

    if (tweets) {
      res.send(tweets);
    } else {
      res.status(404).send({ message: 'tweets Not Found' });
    }
  })
);
tweetRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const tweets = await Tweet.find({})
        .populate({
          path: 'tweetedBy',
          model: User,
          select: '_id userName email created',
        })
        .exec();
      res.json({
        message: 'sent',
        tweets,
        statusCode: '201',
      });
    } catch (err) {
      console.log(err);
      res.status(404).send({ message: 'tweets Not Found' });
    }
  })
);

tweetRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req, res) => {
    try {
      const { _id } = await User.findById(req.user._id);
      const newTweet = new Tweet({ content: req.body.content });
      newTweet.tweetedBy = _id;
      const tweet = await newTweet.save();
      res.json({ message: 'saved', tweet, statusCode: '202' });
    } catch (err) {
      res.status(404).send({ message: 'tweets Not Found', err });
    }
  })
);

tweetRouter.put('/:id/like', isAuth, async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  if (tweet) {
    !tweet.likes.includes(req.user._id) && tweet.likes.push(req.user._id);
    const updatedTweet = await tweet.save();
    res.json({ message: 'Tweet liked', updatedTweet, statusCode: '202' });
  } else {
    res.send('error');
  }
});

tweetRouter.put('/:id/dislike', async (req, res) => {
  try {
    const tweet = await Tweet.findOneAndUpdate(
      { _id: req.body.userId },
      { $pull: { likes: req.params.id } },
      { new: true }
    );

    await tweet.save();

    res.send('liked successfully');
  } catch (err) {
    res.send('error');
  }
});

export default tweetRouter;
