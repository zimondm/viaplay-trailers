const { getTrailer } = require('./trailer.controller');
const ViaplayContentService = require('./viaplay-content.service');
const TMDBService = require('./tmdb.service');
const { mockRes } = require('../test-helpers/express-mocks');
/*
    Basic unit tests for a controller resource.
    Mock service layer and req/res/next to assert response behaviour based on basic scenarios.
*/
describe('api/trailer/trailer.controller', () => {
  beforeAll(() => {
    spyOn(ViaplayContentService, 'getMovieContent').and.returnValue(
      Promise.resolve({})
    );
    spyOn(ViaplayContentService, 'extractImdbContent').and.returnValue({
      id: '',
    });
    spyOn(TMDBService, 'findTrailer').and.returnValue(Promise.resolve({}));
  });
  describe('getTrailer?movieURI=<viaplay content uri>', () => {
    it('should return a 400 response if query param is missing', () => {
      const res = new mockRes();
      getTrailer({}, res, () => {});
      expect(res._status).toEqual(400);
    });

    it('should return a status of 200 if the movieURI query param is set', async () => {
      const res = new mockRes();
      req = {
        query: { movieURI: 'http://localhost:1337' },
      };
      await getTrailer(req, res, () => {});
      expect(res._status).toEqual(200);
    });
    it('should return the requested movie URI in the response body', async () => {
      const res = new mockRes();
      req = {
        query: { movieURI: 'http://localhost:1337' },
      };
      await getTrailer(req, res, () => {});
      expect(res._responseBody.movieURI).toEqual(req.query.movieURI);
    });
  });
});
