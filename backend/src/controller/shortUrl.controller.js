import { getShortUrl } from "../dao/saveShortUrl.dao.js";
import { createShortUrlServiceWithoutUser, createShortUrlServiceWithUser } from "../services/shortUrl.service.js";
import { generateNanoId } from "../utils/helper.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";

export const createShortUrl = tryCatchWrapper(async (req, res) => {
    const data = req.body;
    // console.log(data);
    let savedUrl;

    if(req.user){
        // console.log(data.slug);
        savedUrl = await createShortUrlServiceWithUser(data.url, req.user._id, data.slug);
    } else {
        savedUrl = await createShortUrlServiceWithoutUser(url);
    }
    
    res.status(200).json({

        
            shortUrl: `${process.env.BASE_URL || 'http://localhost:3000/'}${savedUrl.short_url}`,
    });

});

export const redirectShortUrl = tryCatchWrapper(async (req, res) => {
    const { id } = req.params;
    const url = await getShortUrl(id);
    // console.log(url)
    res.redirect(url.full_url);
});