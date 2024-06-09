import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from "path";
import userRouter from './routes/user.js';
import questionRouter from './routes/question.js';
import answerRouter from './routes/answer.js';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Allow cookies to be sent cross-origin
}));


app.use('/users', userRouter);
app.use('/questions', questionRouter);
app.use('/answers', answerRouter);


app.listen (process.env.PORT || 5000);

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "/client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});