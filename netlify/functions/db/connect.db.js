const {MongoClient} = require("mongodb")

async function connectDB(uri) {
    let mongoClient;
    
    try {
      mongoClient = await MongoClient.connect(uri);
      console.log("mongo connection is running...");
  
      return mongoClient;
    } catch (e) {
      console.log(e);
    }
  }


// export default connectDB

module.exports = connectDB