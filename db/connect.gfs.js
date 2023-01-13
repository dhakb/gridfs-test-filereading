// const {GridFSBucket} = require("mongodb")
// const connectDB = require("./connect.db.js")

import { MongoClient, GridFSBucket } from "mongodb";


function connectToBucket(database, bucketName) {
  const mongoClient = new MongoClient(`mongodb+srv://salyut:r6Ajhbk6EBRn1dhw@cluster0.n0ya2zz.mongodb.net/?retryWrites=true&w=majority`);
  const db = mongoClient.db(database);
  let bucket = new GridFSBucket(db, { bucketName: bucketName });

  return { bucket, mongoClient };
}

export default connectToBucket;
