import expess from "express";
import cors from "cors"
import { config } from "dotenv";
import serveless from "serverless-http"

import {uploadImage, getImage, getImages} from "./controllers/upload.js"


const app = expess();
config();


app.use(cors({origin: "*"}))
app.use(expess.json())
app.use(expess.urlencoded({extended: true}))

app.post("/.netlify/functions/index/upload", uploadImage)
app.get("/.netlify/functions/index/upload/images", getImages)
app.get("/.netlify/functions/index/upload/:imgId", getImage)



// export const handler = serveless(app)

// module.exports.handler = serveless(app)

app.listen(8000, () => {
  console.log("running");
});
