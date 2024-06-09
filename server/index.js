import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
import questionRouter from './routes/question.js';
import answerRouter from './routes/answer.js';

dotenv.config();

const app = express();

app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());


app.use(cors());


app.use('/users', userRouter);
app.use('/questions', questionRouter);
app.use('/answers', answerRouter);


app.listen(process.env.PORT || 5000, () => {
  console.log(`Run on ${process.env.PORT || 5000}`);
});