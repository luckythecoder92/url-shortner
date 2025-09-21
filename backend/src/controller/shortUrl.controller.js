import { getShortUrl } from "../dao/saveShortUrl.js";
import { createShortUrlServiceWithoutUser } from "../services/short_url_service.js";
import { generateNanoId } from "../utils/helper.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";

export const createShortUrl = tryCatchWrapper(async (req, res) => {
    const { url } = req.body;
    const shortUrl = await createShortUrlServiceWithoutUser(url);
    res.send(process.env.APP_URL + shortUrl);
});

export const redirectShortUrl = tryCatchWrapper(async (req, res) => {
    const { id } = req.params;
    const url = await getShortUrl(id);
    // console.log(url)
    res.redirect(url.full_url);
});