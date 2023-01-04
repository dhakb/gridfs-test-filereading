import expess from "express";
import cors from "cors"
import { config } from "dotenv";

import uploadMiddleware from "./middleware/upload.js";
import {uploadImage, getImage, getImages} from "./controllers/upload.js"


const app = expess();
config();


app.use(cors({origin: "*"}))
app.use(expess.json())
app.use(expess.urlencoded({extended: true}))

app.post("/upload", uploadImage)
app.get("/upload/images", getImages)
app.get("/upload/:imgId", getImage)




app.listen(8080, () => {
  console.log("running");
});
