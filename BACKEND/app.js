import express from "express";
const app = express();
import { connectDB } from "./src/confing/mongo.confing.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import { shortUrlModel } from "./src/models/shorturl.model.js";

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/api/create", async (req,res)=>{
    const {url} = req.body
    const shortUrl = nanoid(7)
    const newUrl = new shortUrlModel({
        full_url:url,
        short_url:shortUrl
    })
    await newUrl.save()
    res.send(shortUrl)
})

app.get("/:id", async (req, res) =>{
    const {id} = req.params // id = "x7Ab920"
    const url = await shortUrlModel.findOne({ short_url: id }) 

    if(url){
        res.redirect(url.full_url)
    } else {
        res.status(404).send("URL not found")
    }
})

app.listen(3000, () => {
    connectDB()
    console.log("Server is running on http://localhost:3000")
})




/*
User submits google.com
        ↓
POST /api/create receives it in req.body.url
        ↓
nanoid(7) creates short id, like "x7Ab92Q"
        ↓
MongoDB saves:
{
  full_url: "https://google.com",
  short_url: "x7Ab92Q",
  clicks: 0
}
        ↓
Later user visits /x7Ab92Q
        ↓
Backend searches MongoDB for short_url = "x7Ab92Q"
        ↓
Backend redirects to https://google.com
*/
