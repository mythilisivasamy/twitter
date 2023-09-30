import express from 'express';
import User from '../models/userModel.js';
import { isAuth } from '../middleware/protectedRoute.js';
import asyncHandler from 'express-async-handler';
const userRouter = express.Router();
userRouter.get(
  '/:id',
  isAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
      if (user) {
        res.json({ message: 'succeeded', user, statusCode: '201' });
      }
    } catch (err) {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.get(
  '/',
  isAuth,
  asyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      if (users) {
        res.json({ message: 'succeeded', users, statusCode: '201' });
      }
    } catch (err) {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put('/:id/follow', isAuth, async (req, res) => {
  try {
    let user = await User.findById({ _id: req.user._id });
    if (user) {
      !user.following.includes(req.params.id) &&
        user.following.push(req.params.id);
    }
    user = await user.save();

    let follower = await User.findById({ _id: req.params.id });
    if (follower) {
      !follower.followers.includes(req.user._id) &&
        follower.followers.push(req.user._id);
    }
    follower = await follower.save();

    console.log(`user,${user} follow ${follower}`);
    res.json({ message: 'succeeded', user, follower, statusCode: '201' });
  } catch (err) {}
});

userRouter.put('/:id/unfollow', async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { following: req.params.id } },
      { new: true }
    );
    user = await user.save();
    let follower = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { followers: req.user._id } },
      { new: true }
    );
    follower = await follower.save();
    res.json({ message: 'succeeded', user, follower, statusCode: '201' });
  } catch (err) {
    res.send(err);
  }
});
userRouter.put('/:id/uploadProfilePic', async (req, res) => {});

userRouter.put('/profile', isAuth, async (req, res) => {
  const { location, dob } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.location = location;
    user.dob = dob;
    const updatedUser = await user.save();
    return res.status(201).json({
      message: 'succeeded',
      statusCode: '201',
      user: updatedUser,
    });
  } else {
    return res.status(404).json('User not found');
  }
});
export default userRouter;
