const {GridFSBucket} = require("mogondb")
const connectDB = require("./connect.db.js")


// import { GridFSBucket } from "mongodb";
// import connectDB from "./connect.db.js";

async function connectToBucket(database, bucketName) {
  const mongoClient = await connectDB(process.env.MONGO_URI);
  const db = mongoClient.db(database);
  const bucket = new GridFSBucket(db, { bucketName: bucketName });

  return { bucket, mongoClient };
}

// export default connectToBucket;


module.exports = connectToBucket