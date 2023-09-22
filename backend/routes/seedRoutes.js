import express from 'express';
import User from '../models/userModel.js';
import data from '../data.js';

// api
const seedRouter = express.Router();
seedRouter.get('/', async (req, res) => {
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

export default seedRouter;
