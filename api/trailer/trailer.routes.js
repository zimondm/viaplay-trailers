const router = require('express').Router();
const { getTrailer } = require('./trailer.controller');

router.get('/trailer', getTrailer);

module.exports = router;
