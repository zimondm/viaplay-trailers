/*
    Service module used for interacting with the TMDB API
*/
const fetchWrapper = require('../fetch/fetch-wrapper');
async function findTrailer(imdbId) {
  if (!imdbId) {
    return null;
  }
  // Queries the TMDB API using id from IMDB for any associated videos.
  try {
    // According to tmdb api docs the video endpoint requires an integer id of the movie, which means an imdb internal id, which would require the step below to complete.
    // However, the video endpoint appears to accept external id's without specifying external id source so we're skipping the lookup step.

    // const { movie_results } = await fetchWrapper
    //   .fetch(
    //     `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&api_key=${TMDB_API_KEY}`
    //   )
    //   .then((r) => r.json());
    // if (movie_results.length === 0) {
    //   return null;
    // }
    // const tmdbId = movie_results[0].id;

    const { results } = await fetchWrapper
      .fetch(
        `${process.env.TMDB_API_ROOT}movie/${imdbId}/videos?api_key=${process.env.TMDB_API_KEY}`
      )
      .then((r) => r.json());
    if (results.length === 0) {
      return null;
    }
    // We're only looking for trailers hosted on youtube.
    const trailerData = results.find(
      ({ type, site }) => type === 'Trailer' && site === 'YouTube'
    );
    if (!trailerData) {
      return null;
    }
    const { key, name } = trailerData;
    const trailerURI = `https://youtube.com/watch?v=${key}`;

    return { trailerURI, name };
  } catch (e) {
    console.error(`[TMDBService] ${e}`);
    return null;
  }
}

module.exports = {
  findTrailer,
};
