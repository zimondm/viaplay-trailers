const router = require('express').Router();
const { getTrailer } = require('./trailer.controller');
const { cacheGet, cacheSet } = require('../cache/cache');
const rateLimit = require('express-rate-limit');
const trailerLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});
/*
    The trailer endpoint.

    Query parameters:
    * movieURI - a viaplay content uri

    In memory cache enabled for this endpoint with a ttl of 5 minutes.
    Example rate limiting applied with a max of 100 requests/min per ip
*/
router.get('/trailer', trailerLimiter, cacheSet(300), cacheGet, getTrailer);

module.exports = router;
