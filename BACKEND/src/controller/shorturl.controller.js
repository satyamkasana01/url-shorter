import { createShortUrlWithoutUser } from "../services/shorturl.service.js"
import { getShortUrl } from "../dao/shorturl.js"


export const createShortUrl = async (req,res)=>{
    const {url} = req.body
    const shortUrl = await createShortUrlWithoutUser(url)
    res.send(process.env.APP_URL + shortUrl)

}

export const redirectFromShortUrl = async (req,res) =>{
     const {id} = req.params // id = "x7Ab920"
    const url = await getShortUrl(id)

    if(url){
        res.redirect(url.full_url)
    } else {
        res.status(404).send("URL not found")
    }
}
   

