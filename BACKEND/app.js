import express from "express";
const app = express();
import { connectDB } from "./src/confing/mongo.confing.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import { shortUrlModel } from "./src/models/shorturl.model.js";

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/api/create",(req,res)=>{
    const {url} = req.body
    const shortUrl = nanoid(7)
    const newUrl = new shortUrlModel({
        full_url:url,
        short_url:shortUrl
    })
    newUrl.save()
    res.send(nanoid(7))
})

app.listen(3000, () => {
    connectDB()
    console.log("Server is running on http://localhost:3000")
})