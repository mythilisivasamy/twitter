import express from 'express';
import User from '../models/userModel.js';
import Tweet from '../models/tweetModel.js';
import { isAuth } from '../middleware/protectedRoute.js';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
const tweetRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return res
        .status(400)
        .json({ error: 'File types allowed are .jpeg, .png, .jpg' });
    }
  },
});

//Tweets API
tweetRouter.post('/upload', upload.single('profileImg'), async (req, res) => {
  res.send('succeeded');
});
tweetRouter.get(
  '/:id/tweets',
  asyncHandler(async (req, res) => {
    const tweets = await Tweet.find({ tweetedBy: req.params.id });

    if (tweets) {
      res.json({
        message: 'succeeded',
        tweets,
        statusCode: '201',
      });
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
          select: '_id userName email following followers createdAt',
        })
        .populate({
          path: 'retweetBy',
          model: User,
          select: '_id userName email following followers createdAt',
        })
        .exec();
      res.json({
        message: 'succeeded',
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
  upload.single('profilePic'),
  asyncHandler(async (req, res) => {
    try {
      //const { _id } = await User.findById(req.user._id);
      let tweet;
      const newTweet = new Tweet({ content: req.body.content });
      newTweet.tweetedBy = req.user._id;
      tweet = await newTweet.save();
      tweet = await Tweet.findById({ _id: tweet._id })
        .populate({
          path: 'tweetedBy',
          model: User,
          select: '_id userName email following followers createdAt',
        })
        .populate({
          path: 'retweetBy',
          model: User,
          select: '_id userName email following followers createdAt',
        })
        .exec();
      res.json({ message: 'succeeded', tweet, statusCode: '201' });
    } catch (err) {
      res.status(404).send({ message: 'tweets Not Found', err });
    }
  })
);

tweetRouter.post(
  '/comment',
  isAuth,
  asyncHandler(async (req, res) => {
    try {
      const comment = {
        content: req.body.content,
        commentedBy: req.user._id,
        commentedAt: Date.now(),
      };
      const tweet = await Tweet.findById(req.body.tweetId);
      tweet.comments.push(comment);

      const savedTweet = await tweet.save();
      const commentedTweet = await Tweet.findById({ _id: savedTweet._id })
        .populate({
          path: 'tweetedBy',
          model: User,
          select: '_id userName email following followers createdAt',
        })
        .populate({
          path: 'retweetBy',
          model: User,
          select: '_id userName email following followers createdAt',
        })
        .exec();
      res.json({ message: 'succeeded', commentedTweet, statusCode: '201' });
    } catch (err) {
      res.status(404).send({ message: 'tweets Not Found', err });
    }
  })
);

tweetRouter.put('/:id/like', isAuth, async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  if (tweet) {
    !tweet.likes.includes(req.user._id) && tweet.likes.push(req.user._id);
    const savedTweet = await tweet.save();
    const likedTweet = await Tweet.findById({ _id: savedTweet._id })
      .populate({
        path: 'tweetedBy',
        model: User,
        select: '_id userName email following followers createdAt',
      })
      .populate({
        path: 'retweetBy',
        model: User,
        select: '_id userName email following followers createdAt',
      })
      .exec();
    res.json({ message: 'succeeded', likedTweet, statusCode: '201' });
  } else {
    res.send('error');
  }
});
tweetRouter.put('/:id/retweet', isAuth, async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  if (tweet) {
    !tweet.retweetBy.includes(req.user._id) &&
      tweet.retweetBy.push(req.user._id);
    const savedTweet = await tweet.save();
    const reTweeted = await Tweet.findById({ _id: savedTweet._id })
      .populate({
        path: 'tweetedBy',
        model: User,
        select: '_id userName email following followers createdAt',
      })
      .populate({
        path: 'retweetBy',
        model: User,
        select: '_id userName email following followers createdAt',
      })
      .exec();
    res.json({ message: 'succeeded', reTweeted, statusCode: '201' });
  } else {
    res.send('error');
  }
});

tweetRouter.put('/:id/delete', isAuth, async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);
  if (tweet) {
    const deletedTweet = await tweet.deleteOne();
    res.json({ message: 'succeeded', deletedTweet, statusCode: '201' });
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
