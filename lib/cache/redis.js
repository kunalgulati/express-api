const redis = require('redis');
require('dotenv').config()

/** Design Choice
 *  As the Http response header from the hatchways system doesn't include any Etags or Cache-Control variables, 
 * I decided to borrow the idea from dynamic caching, where the system tried to supply every object with the nearly same object. 
 * 
 * I am using the Redis Caching database for storing cached data, with time to live 10 mins. 
 * Before fetching any data from Hatchways API, the code checks if the cache contains the requested tag data. 
 * If yes, then it gets the data from the cache. Otherwise, it will get the data from Hatchways API 
 * and add to the cache with 10 mins time to live timer.
 */

/* Connect to redi's server-side cache */
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

/** Get a cache value from redis server using the cache key */
const getValue = async (key) => {
  return new Promise((resolve, reject) =>
    client.get(key, function (err, value) {
      if (err) {
        console.error(err);
        reject(null);
      } else {
        resolve(value);
      }
    }))
}

const validateData = (dataArgs) => { if (typeof (dataArgs) == "string") { return true } else { return false } }

/** Insert a cache value to redis server */
const setValue = (keyArgs, dataArgs, expireTimeArgs) => {
  /** Validate if the Argument is a string, if not return false, because redis will reject anything apart from String */
  if (!validateData(dataArgs)) { console.error("Error: Please provide the Argument as a String to SetValue in Redis"); return false; }

  /** if the user hasn't sent the expiry time, then set expiry time to default value of 60 secs */
  const expireTime = expireTimeArgs || 60;

  client.set(keyArgs, dataArgs, function (err) {
    if (err) {
      console.error(err);
      return false;
    } else {
      client.expire(keyArgs, expireTime);
      client.get(keyArgs);
      return true;
    }
  })
};


module.exports = {
  getValue,
  setValue,
};