import express from "express";
import { createShortUrl } from "../controller/shorturl.controller.js";

const ShortUrlrouter = express.Router();

ShortUrlrouter.post("/", createShortUrl)

export {ShortUrlrouter}




