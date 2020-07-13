const ViaplayContentService = require('./viaplay-content.service');

/*
    Controller module responsible for handling requests for this sub-API, offloading external requests and most logic to service modules.
*/
async function getTrailer(req, res, next) {
  const { movieURI } = req.query || {};
  if (!movieURI) {
    return res.sendStatus(400);
  }
  try {
    const movieData = await ViaplayContentService.getMovieContent(movieURI);

    res.status(200).send({ movieURI, movieData });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getTrailer,
};
