Resources;

  1. Set-up: https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/
  1. Caching: https://docs.microsoft.com/en-us/azure/architecture/best-practices/caching
  1. Caching: https://www.fastly.com/blog/api-caching-part-i
  1. 
  1. 
  1. 


* Caching * 
    2. If an application chooses not to cache this data on the basis that the cached information will nearly always be outdated, then the same consideration could be true when storing and retrieving this information from the data store. In the time it takes to save and fetch this data, it might have changed.

    3. You are also fortunate that you can actually measure the hit-rate of you caching once you have it in place. The hit-rate is simply number of hits divided by number of calls.