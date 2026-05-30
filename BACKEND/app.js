
import express from "express";
import { connectDB } from "./src/confing/mongo.confing.js";
import dotenv from "dotenv";
import { shortUrlModel } from "./src/models/shorturl.model.js";
import { ShortUrlrouter } from "./src/routes/shorturl.route.js";
import { redirectFromShortUrl } from "./src/controller/shorturl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config()

const app = express();
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", authRoutes)
app.use("/api/create",ShortUrlrouter)
app.get("/:id", redirectFromShortUrl)

app.use(errorHandler)

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