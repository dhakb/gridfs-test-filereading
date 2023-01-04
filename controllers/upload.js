import { GridFSBucket, ObjectId } from "mongodb";


import connectDB from "../db/connect.db.js";
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


export const getImage = async (req, res) => {
  const { imgId }= req.params
  let connection;
    
  try {
    connection = await connectToBucket("uploads_fs", "images")
   
    const _id = ObjectId(imgId)

    connection.bucket.openDownloadStream(_id).pipe(res)
    
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e.message,
    });
  }
};



export const getImages = async (req, res) => {
  let connection;

  try {
    connection = await connectToBucket("uploads_fs", "images")
    // const mongoClient = await connectDB(process.env.MONGO_URI)
    // const db = mongoClient.db("uploads_fs")
    // const collection = db.collection("images.files")

    let images = []
    const cursor = connection.bucket.find()
    // cursor.toArray((err, files) => {
    //   files.forEach(doc => {
    //     console.log(doc)
    //       images.push(doc)
    //     })
    // })
    
    await cursor.forEach((doc) => {
      images.push(doc)
    })

    res.send(images)
  } catch (e) {
    console.log(e)
  }
}
