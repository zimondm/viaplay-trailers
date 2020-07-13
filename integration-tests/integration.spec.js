const request = require('supertest');
const app = require('../api/index');

/*
    Integration tests will test the application in full, any external dependencies should be mocked for these tests to ensure stable tests.
*/

// Root level, if the app has any side effects on startup (such as pinging external monitoring or initializing external deps) we can assert them here by querying the external mock.
describe('/app', () => {
  it('should return a 404 for unknown resources', (done) => {
    request(app).get('/unknown/api').expect(404, done);
  });
  // Organise tests per sub-API and per endpoint
  describe('GET /trailer', () => {
    it('should return a successful response code for the dummy implementation', (done) => {
      request(app).get('/trailer').expect(200, done);
    });
  });
});
