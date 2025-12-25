import { MongoClient, ServerApiVersion }  from "mongodb";

// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://arisulzbacher:U2x5rXSW2WmTptCb@cluster0.ostmhm3.mongodb.net/?appName=Cluster0"
//process.env.MONGODB_URI;
console.log(uri)

// Creates a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function run() {
  try {
    await client.connect();
    await client.db("live-gate").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(err){
    console.log(err)
  }
}
run().catch(console.dir);

const collection = client.db('live-gate')

export default collection