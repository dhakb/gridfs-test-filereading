const express = require("express")
const cors = require("cors")
const serveless = require("serverless-http")
require("dotenv").config()

const {uploadImage, getImage, getImages} = require("./controllers/upload")

// import express from "express";
// import cors from "cors"
// import { config } from "dotenv";
// import serveless from "serverless-http"


// import {uploadImage, getImage, getImages} from "./controllers/upload.js"


const app = express();
config();


app.use(cors({origin: "*"}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/.netlify/functions/index/upload", uploadImage)
app.get("/.netlify/functions/index/upload/images", getImages)
app.get("/.netlify/functions/index/upload/:imgId", getImage)



// export const handler = serveless(app)

// module.exports.handler = serveless(app)

app.listen(8000, () => {
  console.log("running");
});
