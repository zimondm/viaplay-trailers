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
    it('should return a 400 status code if query param is omitted', (done) => {
      request(app).get('/trailer').expect(400, done);
    });
    it('should return a 200 status code for successful lookups', (done) => {
      request(app)
        .get(`/trailer?movieURI=${encodeURI('http://localhost:1337/content')}`)
        .expect(200, done);
    });
    it('should return the requested movie URI in the response body', (done) => {
      request(app)
        .get(`/trailer?movieURI=${encodeURI('http://localhost:1337/content')}`)
        .expect((res) => {
          expect(res.body.movieURI).toEqual('http://localhost:1337/content');
        })
        .expect(200, done);
    });
    it('should return the trailer for successfull requests', (done) => {
      request(app)
        .get(`/trailer?movieURI=${encodeURI('http://localhost:1337/content')}`)
        .expect((res) => {
          expect(res.body.trailer.trailerURI).toEqual(
            'https://youtube.com/watch?v=ayoutubevideokey'
          );
        })
        .expect(200, done);
    });
  });
});
