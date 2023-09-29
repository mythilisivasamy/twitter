import express from 'express';
import User from '../models/userModel.js';
import Tweet from '../models/tweetModel.js';
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
        res.json({ message: 'user sent', user, statusCode: '201' });
      }
    } catch (err) {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put('/:id/follow', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    !user.following.includes(req.body.userId) &&
      user.following.push(req.body.userId);
    await user.save();

    const follower = await User.findById(req.body.userId);
    if (follower) {
      !follower.followers.includes(req.params.id) &&
        follower.followers.push(req.params.id);
      await follower.save();
    }
    res.json({message:'succeeded',user,statusCode:'201'})
  } else {
    res.send('error');
  }
});

userRouter.put('/:id/unfollow', async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { following: req.body.userId } },
      { new: true }
    );
    await user.save();
    user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pull: { followers: req.params.id } },
      { new: true }
    );
    await user.save();
    res.send('unfollow success');
  } catch (err) {
    res.send(err);
  }
});
userRouter.put('/:id/uploadProfilePic',async(req,res)=>{
  
})

export default userRouter;
