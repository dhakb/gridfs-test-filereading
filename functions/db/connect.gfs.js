// const {GridFSBucket} = require("mongodb")
// const connectDB = require("./connect.db.js")

import { MongoClient, GridFSBucket } from "mongodb";


async function connectToBucket(database, bucketName) {
  const mongoClient = new MongoClient(`${process.env.MONGO_URI}`);

  try {
    await mongoClient.connect();
  } catch (e) {
    console.log(e)
  }
  
  const db = mongoClient.db(database);
  const bucket = new GridFSBucket(db, { bucketName: bucketName });

  return { bucket, mongoClient };
}

export default connectToBucket;

// module.exports = connectToBucket
