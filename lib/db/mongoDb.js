const {MongoClient} = require('mongodb');
require('dotenv').config();

async function listDatabases(client){
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {useUnifiedTopology: true});

  try {
      /** Connect to the MongoDB cluster */ 
      const returnClientObj = await client.connect();
      await  listDatabases(returnClientObj);
      return returnClientObj;
  } catch (e) {
      console.error(e);
  } 
}


/** 
 * Try connecting to MongoDB Database and get list of all collection 
 * Then Successfully close the connection
 */
// const test = async () =>{
//   const result = await main().catch(console.error);
//   await  listDatabases(result);
//   await result.close();
// }

// test();

module.exports ={
  main,
}