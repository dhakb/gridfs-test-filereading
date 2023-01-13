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
import { MongoClient } from "mongodb"
import { GridFsStorage } from "multer-gridfs-storage"
config()


const mongo_db = new MongoClient(`${process.env.MONGO_URI}`).connect().then(client => client.db("uploads_fs"))
console.log(`${process.env.MONGO_URI}`)


const storage = new GridFsStorage({
    db: mongo_db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(12, (err, buff) => {
                if(err) return reject(err)
              
                const filename = buff.toString("hex") + path.extname(file.originalname)
                const fileInfo = {filename, bucketName: "images"}

                resolve(fileInfo)
            })
        })
    },
})


const upload = multer({storage}).single("file")
const uploadMiddleware = util.promisify(upload)


// module.exports = uploadMiddleware

// export default upload
export default uploadMiddleware
