// const {ObjectId} = require("mongodb")

// const connectDB = require("../db/connect.db.js")
// const connectToBucket = require("../db/connect.gfs.js")
// const uploadMiddleware = require("../middleware/upload.js")


import fs from "fs"
import { ObjectId } from "mongodb";
import connectToBucket from "../db/connect.gfs.js";
import uploadMiddleware from "../middleware/upload.js";


export const uploadImage = async (req, res) => {
  try {
    await uploadMiddleware(req, res); 

    res.status(200).send("succes");
  } catch (e) {
    res.status(500).send();
  }
};

//Read Image. Stream file data from gridfs 
export const getImage = async (req, res) => {
  const { imgId }= req.params
  const _id = ObjectId(imgId)

  let connection = connectToBucket("uploads_fs", "images")
  
  try {
    await connection.mongoClient.connect()
    const downloadStream = connection.bucket.openDownloadStream(_id)
    downloadStream.pipe(res)

    // downloadStream.on("data", (data) => {
    //   console.log(data)
    //   fs.writeFileSync("./img.jpg", data)
    // })

 
    // res.send({})
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e.message,
    });
  } 
};


// Fetch all images from collection
export const getImages = async (req, res) => {
  let connection = connectToBucket("uploads_fs", "images")

  try {
    await connection.mongoClient.connect()
    let images = []

    const cursor = connection.bucket.find()
    await cursor.forEach((doc) => {images.push(doc)})

    res.send(images)
  } catch (e) {
    console.log(e)
  } finally {
    await connection.mongoClient.close()
  }
}
