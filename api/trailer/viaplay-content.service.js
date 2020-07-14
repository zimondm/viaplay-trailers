/*
    Service module used for interacting with the Viaplay Content API
*/
const fetchWrapper = require('../fetch/fetch-wrapper');
const url = require('url');
function getMovieContent(movieURI) {
  if (!movieURI || typeof movieURI !== 'string') {
    throw new Error(`Missing or incorrect URI`);
  }
  const movieURL = url.parse(movieURI);
  if (movieURL.hostname !== 'content.viaplay.se') {
    throw new Error(`Missing or incorrect URI`);
  }
  return fetchWrapper.fetch(movieURL.href).then((res) => res.json());
}

function extractImdbContent(movieData) {
  try {
    // Strict dependency on that all movies always contain the followin structure.
    return movieData._embedded['viaplay:blocks'][0]._embedded['viaplay:product']
      .content.imdb;
  } catch (e) {
    console.error(`[ViaplayContentService] ${e}`);
    return null;
  }
}

module.exports = {
  getMovieContent,
  extractImdbContent,
};
