import e from "express"
import { saveShortUrl } from "../dao/shorturl.js"
import { generateNanoId } from "../utils/helper.js"


export const  createShortUrlWithoutUser = async(url) =>{
 
    try {
        const shortUrl = await generateNanoId(7)
        await saveShortUrl(shortUrl, url)
        return shortUrl
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error (URL already exists)
            throw new AppError("Short URL already exists, try again", 409);
        }
        throw error; // Re-throw other errors to be handled by the global error handler
    }
}

export const createShortUrlWithUser = async(url,userId) =>{
    const shortUrl = await generateNanoId(7)
    await saveShortUrl(url, shortUrl, userId)
    return shortUrl
}