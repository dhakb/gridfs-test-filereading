// const util = require("util")
// const mmulter = require("multer")
// const crypto = require("crypto")
// const path = require("path")
// const {GridFsStorage} = require("multer-gridfs-storage")
// require("dotenv").config()

// const connectDB = require("../db/connect.db.js")


import util from "node:util"
import multer from "multer"
import crypto from "crypto"
import path from "path"
import {config} from "dotenv"
import { GridFsStorage } from "multer-gridfs-storage"

import connectDB from "../db/connect.db.js"

config()

const mongoClient = await connectDB(process.env.MONGO_URI)  

const storage = new GridFsStorage({
    db: mongoClient.db("uploads_fs"),
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(12, (err, buff) => {
                if(err) return reject(err)
              
                const filename = buff.toString("hex") + path.extname(file.originalname)
        
                console.log("avoieeeee")
                const fileInfo = {filename, bucketName: "images"}

                resolve(fileInfo)
            })
        })
    },
    // fileFilter: function (req, file, cb) {
        
    // }
})


const upload = multer({storage}).single("file")
const uploadMiddleware = util.promisify(upload)


// module.exports = uploadMiddleware

// export default upload
export default uploadMiddleware
