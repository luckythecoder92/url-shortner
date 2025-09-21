import mongoose from "mongoose";
import express from 'express';
import shortUrl from "../models/shorturl.model.js";
import { createShortUrl } from "../controller/shortUrl.controller.js";

const router = express.Router();

router.post('/',createShortUrl )



export default router