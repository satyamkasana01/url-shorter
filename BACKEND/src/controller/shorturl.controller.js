import { nanoid } from "nanoid"
import { shortUrlModel } from "../models/shorturl.model.js"

export const createShortUrl = async (req,res)=>{
    const {url} = req.body
    const shortUrl = nanoid(7)
    const newUrl = new shortUrlModel({
        full_url:url,
        short_url:shortUrl
    })
    await newUrl.save()
    res.send(shortUrl)
}