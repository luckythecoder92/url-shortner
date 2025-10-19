import express from "express";
import dotenv from "dotenv";
dotenv.config(); // load environment variables
import { nanoid } from "nanoid";
import connectDB from "./src/config/db.js";
import urlSchema from "./src/models/shorturl.model.js";
import shortUrlRoute from "./src/routes/short_url.routes.js";
import shortUrl from "./src/models/shorturl.model.js";
import { redirectShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import authRoute from "./src/routes/auth.routes.js";
import cookieparser from 'cookie-parser';
import cors from 'cors';
import { attatchUser } from "./src/utils/attachUser.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(attatchUser)

// API route

app.use("/api/auth", authRoute);
app.use("/api/create", shortUrlRoute);
app.get("/:id", redirectShortUrl);
app.use(errorHandler);

// Start server after DB connects
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
