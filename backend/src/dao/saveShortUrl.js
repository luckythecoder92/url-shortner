import e from "express";
import shortUrl from "../models/shorturl.model.js";
import urlSchema from '../models/shorturl.model.js'
import { ConflictError } from "../utils/errorHandler.js";


export const saveShortUrl = async(shortUrl,longUrl, userId)=>{
   try {      const newUrl = new urlSchema({
        full_url : longUrl,
        short_url:shortUrl
      })
      if(userId){
        shortUrl.user_id = userId;
      }
      await newUrl.save();}
      catch(err){
        if (err.code == 11000) {
          throw new ConflictError("Short URL already exists!")
        }
        throw new Error(err)
      }
}

export const getShortUrl = async (shortUrl)=>{
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}})
}