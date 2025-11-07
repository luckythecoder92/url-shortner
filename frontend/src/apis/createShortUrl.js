import  axiosInstance  from "../utils/axiosInstance.js";

export const createShortUrl = async(url, customSlug) => {
    try {
        const { data } = await axiosInstance.post('/api/create', { 
            url,
            slug: customSlug // Match backend parameter name
        });
        console.log('API Response:', data);
        if (!data || !data.shortUrl) {
            throw new Error('Invalid response from server');
        }
        return data.shortUrl;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
