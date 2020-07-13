const { getTrailer } = require('./trailer.controller');

/*
    Basic unit tests for a controller resource.
    Mock service layer and req/res/next to assert response behaviour based on basic scenarios.
*/
describe('api/trailer/trailer.controller', () => {
  describe('getTrailer', () => {
    it('should return a http status code', () => {
      let status;
      let response;
      const res = {
        status: (s) => (status = s) && { send: (r) => (response = r) },
      };
      getTrailer({}, res, () => {});
      expect(typeof status).toEqual('number');
    });
  });
});
