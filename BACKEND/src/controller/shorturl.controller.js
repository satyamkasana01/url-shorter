import { createShortUrlWithoutUser } from "../services/shorturl.service.js"
import { getShortUrl } from "../dao/shorturl.js"
import { AppError, asyncHandler } from "../utils/errorHandler.js"


export const createShortUrl = asyncHandler(async (req,res)=>{
    const {url} = req.body

    if(!url) {
        throw new AppError("URL is required", 400)
    }

    const shortUrl = await createShortUrlWithoutUser(url)
    res.status(201).json({
        success: true,
        shortUrl: process.env.APP_URL + shortUrl
    })

})

export const redirectFromShortUrl = asyncHandler(async (req, res) => {
    const { id } = req.params
    const url = await getShortUrl(id)

    if (!url) {
        throw new AppError("URL not found", 404)
    }

    res.redirect(url.full_url)
})
   

