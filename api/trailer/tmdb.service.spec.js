const fetchWrapper = require('../fetch/fetch-wrapper');
const TMDBService = require('./tmdb.service');

describe('TMDBService', () => {
  let fetchMock = null;
  beforeAll(() => {
    fetchSpy = spyOn(fetchWrapper, 'fetch');
    fetchSpy.and.returnValue(Promise.resolve({}));
  });
  describe('findTrailer', () => {
    it('should resolve with an object containing trailerURI and movie title for successfull lookups', async () => {
      fetchSpy.and.returnValue(
        Promise.resolve({
          json: () => ({
            results: [
              {
                type: 'Trailer',
                site: 'YouTube',
                key: 'ayoutubevideokey',
                name: 'movietitle',
              },
            ],
          }),
        })
      );
      const { name, trailerURI } = await TMDBService.findTrailer('mocktitle');
      expect(name).toBeTruthy();
      expect(trailerURI).toBeTruthy();
    });
    it('should resolve with a null value if lookup fails', async () => {
      fetchSpy.and.returnValue(
        Promise.resolve({
          json: () => ({
            results: [],
          }),
        })
      );
      const result = await TMDBService.findTrailer('mocktitle');
      expect(result).toEqual(null);
    });
  });
});
