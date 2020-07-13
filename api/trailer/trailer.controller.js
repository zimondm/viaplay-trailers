function getTrailer(req, res, next) {
  res
    .status(200)
    .send({ movie: '<requested movie name>', trailerUrl: '<trailer url>' });
}

module.exports = {
  getTrailer,
};
