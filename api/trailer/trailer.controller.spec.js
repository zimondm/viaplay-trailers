const { getTrailer } = require('./trailer.controller');

/*
    Basic unit tests for a controller resource.
    Mock service layer and req/res/next to assert response behaviour based on basic scenarios.
*/

// Mock object to allow testing of express controller middlewares.
function mockRes() {
  this._status = null;
  this._responseBody = null;
  this.sendStatus = (s) => (this._status = s);
  this.status = (s) => (this._status = s) && this;
  this.send = (r) => {
    this._responseBody = r;
  };
}
describe('api/trailer/trailer.controller', () => {
  describe('getTrailer?movieURI=<viaplay content uri>', () => {
    it('should return a 400 response if query param is missing', () => {
      const res = new mockRes();
      getTrailer({}, res, () => {});
      expect(res._status).toEqual(400);
    });

    it('should return a status of 200 if the movieURI query param is set', () => {
      const res = new mockRes();
      req = {
        query: { movieURI: 'http://localhost:1337' },
      };
      getTrailer(req, res, () => {});
      expect(res._status).toEqual(200);
    });
    it('should return the requested movie URI in the response body', () => {
      const res = new mockRes();
      req = {
        query: { movieURI: 'http://localhost:1337' },
      };
      getTrailer(req, res, () => {});
      expect(res._responseBody.movieURI).toEqual(req.query.movieURI);
    });
  });
});
