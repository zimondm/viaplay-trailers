const router = require('express').Router();
const { getTrailer } = require('./trailer.controller');
const { cacheGet, cacheSet } = require('../cache/cache');

/*
    The trailer endpoint.

    Query parameters:
    * movieURI - a viaplay content uri

    in memory cache enabled for this endpoint with a ttl of 5 minutes.
*/
router.get('/trailer', cacheSet(300), cacheGet, getTrailer);

module.exports = router;
