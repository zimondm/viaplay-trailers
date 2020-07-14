const NodeCache = require('node-cache');

// Shared cache for whole app, this simple cache works by defining the cache set middleware as overriding the send function on the response object and will set
// a new cache entry if the response was not itself a cache hit (using a flag on the locals store on the response object).
// Cache key is the path requested plus any query parameters.
const cacheInstance = new NodeCache();

// Cache get middleware, register globally or only for routes that are relevant to cache
function cacheGet(req, res, next) {
  const cacheResult = cacheInstance.get(req.originalUrl);
  if (cacheResult) {
    res.locals.cacheHit = true;
    res.status(cacheResult.status).send(cacheResult.body);
  } else {
    next();
  }
}

// Cache set middleware, register globally or only for routes that are relevant to cache.
function cacheSet(ttl = 300) {
  return (req, res, next) => {
    const send = res.send.bind(res);
    res.send = (body) => {
      if (!res.locals.cacheHit) {
        cacheInstance.set(
          req.originalUrl,
          {
            status: res.statusCode,
            body,
          },
          ttl
        );
      }
      send(body);
    };
    next();
  };
}
module.exports = {
  cacheGet,
  cacheInstance,
  cacheSet,
  _testHandle: cacheInstance,
};
