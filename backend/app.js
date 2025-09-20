import express from "express";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import connectDB from "./config/db.js";
import urlSchema from "./models/shorturl.model.js";

dotenv.config(); // load environment variables

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route
app.post("/api/create", (req, res) => {
  const { url } = req.body;
  const shortUrl = nanoid(7);
  const newUrl = new urlSchema({
    full_url : url,
    short_url:shortUrl
  })
  newUrl.save();
  res.send(nanoid(7));
});





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
