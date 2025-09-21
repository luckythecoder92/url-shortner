import { generateNanoId } from "../utils/helper.js";
import urlchema from '../models/shorturl.model.js'
import { saveShortUrl } from "../dao/saveShortUrl.js";

export const createShortUrlServiceWithoutUser = async (url)=>{
     const shortUrl = await generateNanoId(7);
    await saveShortUrl( shortUrl, url);
    return shortUrl
}
export const createShortUrlServiceWithUser = async (url, userId)=>{
     const shortUrl = await generateNanoId(7);
    await saveShortUrl(url, shortUrl, userId);
    return shortUrl
}