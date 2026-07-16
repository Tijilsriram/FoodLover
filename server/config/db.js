const mongoose=require("mongoose");

const client = new MongoClient("mongodb+srv://tijilsriram_db_user:xwXHO07IpLN8iu05@cluster0.pkl1xdi.mongodb.net/");

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}