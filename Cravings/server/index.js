import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import Authrouter from './src/routers/authRouter.js';
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/auth", Authrouter);

app.get("/", (req, res) => {
  console.log("server is working");

});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statudCode || 500;

  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server started at Port:", port);
  connectDB();
});