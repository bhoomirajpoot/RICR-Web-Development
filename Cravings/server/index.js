import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/authRouter.js";
import PublicRouter from "./src/routers/publicRouter.js";

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors({ origin: "http://localhost:5173" })); // React dev server
app.use(express.json()); // Body parser
app.use(morgan("dev")); // Logging

/* ---------- Routes ---------- */
app.use("/auth", AuthRouter);       // Auth routes
app.use("/public", PublicRouter);   // Public routes (contact, etc.)

/* ---------- Root route ---------- */
app.get("/", (req, res) => {
  res.status(200).send("Server is working 🚀");
});

/* ---------- Error Handler ---------- */
app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;

  res.status(StatusCode).json({
    success: false,
    message: ErrorMessage,
  });
});

/* ---------- Start Server ---------- */
const port = process.env.PORT || 5000;

connectDB()        // Connect DB before starting server
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Started at Port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
