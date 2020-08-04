const redis = require('redis');
require('dotenv').config()

/* Connect to redi's server-side cache */
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

/** Get a cache value from redis server using the cache key */
const getValue = async (key) => {
  console.log(key)

  return new Promise( (resolve, reject) =>
    client.get(key, function (err, value) {
      if (err) {
        console.log(err);
        reject(null);
      } else {
        console.log("value");
        resolve(value);
      }
  }))
}

const validateData = (dataArgs) => {if(typeof(dataArgs)=="string"){ return true } else {return false}}

/** Insert a cache value to redis server */
const setValue = (keyArgs, dataArgs, expireTimeArgs) => {
  /** Validate if the Argument is a string, if not return false, because redis will reject anything apart from String */
  if( !validateData(dataArgs) ) { console.error("Error: Please provide the Argument as a String to SetValue in Redis"); return false;}
  
  /** if the user hasn't sent the expiry time, then set expiry time to default value of 60 secs */
  const expireTime = expireTimeArgs || 60;
  
  client.set(keyArgs, dataArgs, function (err) {
    if (err) {
      // Log error
      throw err;
      // return false;
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