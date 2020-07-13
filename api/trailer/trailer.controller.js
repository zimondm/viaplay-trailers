function getTrailer(req, res, next) {
  const { movieURI } = req.query || {};
  if (!movieURI) {
    return res.sendStatus(400);
  }
  res.status(200).send({ movieURI });
}

module.exports = {
  getTrailer,
};
