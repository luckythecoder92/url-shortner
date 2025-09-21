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


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route
app.use("/api/create",shortUrlRoute);


app.get('/:id',redirectShortUrl)
app.use(errorHandler)


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
