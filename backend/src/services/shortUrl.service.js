import { generateNanoId } from "../utils/helper.js";
// import urlchema from '../models/shorturl.model.js'
import { saveShortUrl } from "../dao/saveShortUrl.dao.js";
import { getCustomShortUrl } from "../dao/user.dao.js";

export const createShortUrlServiceWithoutUser = async (url) => {
    const shortUrl = await generateNanoId(7);
    const savedUrl = await saveShortUrl(shortUrl, url);
    return savedUrl;
}
export const createShortUrlServiceWithUser = async (url, userId, slug=null) => {
    // console.log(slug);
    const shortUrl = slug;
    const exists = await getCustomShortUrl(slug)


    if (exists) {
        throw new Error("Custom short URL already exists. Please choose a different one.");
    }
    const savedUrl = await saveShortUrl(shortUrl, url, userId);
    return savedUrl; // Return the full saved URL object instead of just the short URL
}