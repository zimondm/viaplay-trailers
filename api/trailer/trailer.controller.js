const ViaplayContentService = require('./viaplay-content.service');
const TMDBService = require('./tmdb.service');
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
    const { id } = ViaplayContentService.extractImdbContent(movieData) || {};
    const trailer = await TMDBService.findTrailer(id);
    const httpStatus = trailer ? 200 : 404;
    res.status(httpStatus).send({ movieURI, trailer });
  } catch (e) {
    console.error(`[TrailerController] ${e}`);
    next(e);
  }
}

module.exports = {
  getTrailer,
};
