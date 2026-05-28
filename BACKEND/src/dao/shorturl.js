import { shortUrlModel } from "../models/shorturl.model.js"

export const saveShortUrl = async (shortUrl, fullUrl, userId) => {
    const newUrl = new shortUrlModel({
        full_url:fullUrl,
        short_url:shortUrl
    })
    if(userId){
        newUrl.user_id = userId
    }
    await newUrl.save()
}

export const getShortUrl = async (shortUrl) => {
    return await shortUrlModel.findOneAndUpdate({short_url:shortUrl}, {$inc:{clicks:1}})
}