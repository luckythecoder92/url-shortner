import { getShortUrl } from "../dao/saveShortUrl.dao.js";
import { createShortUrlServiceWithoutUser, createShortUrlServiceWithUser } from "../services/shortUrl.service.js";
import { generateNanoId } from "../utils/helper.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";

export const createShortUrl = tryCatchWrapper(async (req, res) => {
    const data = req.body;
    
    if (!data.url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    let savedUrl;
    try {
        if (req.user) {
            savedUrl = await createShortUrlServiceWithUser(data.url, req.user._id, data.slug);
        } else {
            savedUrl = await createShortUrlServiceWithoutUser(data.url);
        }

        if (!savedUrl || !savedUrl.short_url) {
            return res.status(500).json({ message: 'Failed to create short URL' });
        }

        const baseUrl = process.env.APP_URL ;
     const shortUrl = `${baseUrl}/${savedUrl.short_url}`;
        
        console.log('Created short URL:', shortUrl);
        
        res.status(200).json({
            shortUrl: shortUrl,
            originalUrl: savedUrl.full_url
        });
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json({ message: error.message || 'Failed to create short URL' });
    }

});

export const redirectShortUrl = tryCatchWrapper(async (req, res) => {
    const { id } = req.params;
    const url = await getShortUrl(id);
    // console.log(url)
    res.redirect(url.full_url);
});