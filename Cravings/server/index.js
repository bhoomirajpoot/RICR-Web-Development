import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/authRouter.js";
import PublicRouter from "./src/routers/publicRouter.js";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);

// Root endpoint
app.get("/", (req, res) => {
  console.log("Server is Working");
  res.send("Server is Working");
});

// Error handling
app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;
  console.log("Error Found ", { ErrorMessage, StatusCode });

  res.status(StatusCode).json({ message: ErrorMessage });
});

// Start Server & Connect DB
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log("Server Started at Port: ", port);
  await connectDB(); // Connect to MongoDB after server starts
});
