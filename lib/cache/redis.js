const redis = require('redis');
require('dotenv').config()

/* Connect to redi's server-side cache */
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});


/** Get a cache value from redis server using the cache key */
// const get = (key) => {
//   console.log(key)
//   client.get(key, function (err, value) {
//     if (err) {
//       return null;
//     } else {
//       console.log(value);
//       return value;
//     }
//   });
// }

// /** Insert a cache value to redis server */
const set = (keyArgs, dataArgs, expireTimeArgs) => {
  /** if the user hasn't sent the expiry time, then set expiry time to default value of 60 secs */
  const expireTime = expireTimeArgs || 60;
  client.set(keyArgs, dataArgs, function (err) {
    if (err) {
      // Log error
      return false;
    } else {
      client.expire(keyArgs, expireTime);
      client.get(keyArgs);
      return true;
    }
  })
};

// module.exports = {
//   get,
//   set,
// };