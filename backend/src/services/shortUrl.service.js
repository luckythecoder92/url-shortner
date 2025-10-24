import { generateNanoId } from "../utils/helper.js";
// import urlchema from '../models/shorturl.model.js'
import { saveShortUrl } from "../dao/saveShortUrl.dao.js";
import { getCustomShortUrl } from "../dao/user.dao.js";

export const createShortUrlServiceWithoutUser = async (url) => {
    if (!url) {
        throw new Error("URL is required");
    }

    try {
        // Basic URL validation
        new URL(url); // This will throw if URL is invalid
        // console.log(url)
        const shortUrl = await generateNanoId(7);
        const savedUrl = await saveShortUrl(shortUrl, url);
        console.log(savedUrl)
        return savedUrl;
    } catch (error) {
        if (error.message.includes('Invalid URL')) {
            throw new Error("Invalid URL format");
        }
        throw error;
    }
}
export const createShortUrlServiceWithUser = async (url, userId, slug=null) => {
    // Generate a random short URL if no custom slug is provided
    const shortUrl = slug || await generateNanoId(7);
    
    // If there's a custom slug, check if it exists
    if (slug) {
        const exists = await getCustomShortUrl(slug);
        if (exists) {
            throw new Error("Custom short URL already exists. Please choose a different one.");
        }
    }
    
    const savedUrl = await saveShortUrl(shortUrl, url, userId);
    return savedUrl; // Return the full saved URL object instead of just the short URL
}