import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import tweetRouter from './routes/tweetRoutes.js';
import globalErrorHandler from './middleware/errorHandler.js';

// Connecting MongoDB
import connectDB from './database/connection.js';
// Initiate the Express Application
const app = express();
app.use(express.json());
app.use(cors());

//Configuring Process Environment Variables
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT;

connectDB();
//parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//load routes

app.use('/api/seed', seedRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/tweet', tweetRouter);
app.use(globalErrorHandler);

// Express Server Listening at the port
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
