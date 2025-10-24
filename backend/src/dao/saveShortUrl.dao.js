import express from "express";
import urlSchema from "../models/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";


export const saveShortUrl = async (shortUrl, longUrl, userId) => {

  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,

    });
    if (userId) newUrl.user = userId;
    // console.log(userId)
    
    const savedUrl = await newUrl.save();
    // console.log(savedUrl)
    // console.log(savedUrl)
    return savedUrl;
  }
  catch (err) {
    if (err.code == 11000) {
      throw new ConflictError("Short URL already exists!")
    }
    throw new Error(err)
  }
}

export const getShortUrl = async (shortUrl) => {
  console.log(shortUrl)
  return await urlSchema.findOneAndUpdate({ short_url: shortUrl }, { $inc: { clicks: 1 } })
}