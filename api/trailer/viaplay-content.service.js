/*
    Service module used for interacting with the Viaplay Content API
*/
const { fetch } = require('../fetch/fetch-wrapper');
function getMovieContent(movieURI) {
  if (!movieURI || typeof movieURI !== 'string') {
    throw new Error(`Missing or incorrect URI`);
  }
  // TODO add whitelist filter to movieURI in the check above
  return fetch(movieURI).then((res) => res.json());
}

module.exports = {
  getMovieContent,
};
