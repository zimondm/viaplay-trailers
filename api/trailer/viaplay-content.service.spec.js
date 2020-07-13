const fetchWrapper = require('../fetch/fetch-wrapper');
const ViaplayContentService = require('./viaplay-content.service');

describe('ViaplayContentService', () => {
  let fetchSpy = null;
  beforeAll(() => {
    fetchSpy = spyOn(fetchWrapper, 'fetch');
    fetchSpy.and.returnValue(Promise.resolve({}));
  });
  describe('getMovieContent', () => {
    it('should throw an error if no movieURI is provided', () => {
      expect(() => ViaplayContentService.getMovieContent()).toThrow(
        new Error(`Missing or incorrect URI`)
      );
    });
    it('should throw an error if movieURI is of wrong type', () => {
      expect(() => ViaplayContentService.getMovieContent(true)).toThrow(
        new Error(`Missing or incorrect URI`)
      );
    });
    it('should return a promise resolving to the content api response body', async () => {
      const mockRef = {};
      fetchSpy.and.returnValue(Promise.resolve({ json: () => mockRef }));
      const promiseObj = ViaplayContentService.getMovieContent(
        'http://localhost:3000'
      );
      expect(promiseObj.then).toBeTruthy();
      const result = await promiseObj;
      expect(result === mockRef).toBeTrue();
    });
  });
  describe('extractImdbContent', () => {
    it('should return the imdb object from the provided object if it exists', () => {
      const imdb = { id: 'mockid' };
      const movieData = {
        _embedded: {
          'viaplay:blocks': [
            {
              _embedded: {
                'viaplay:product': { content: { imdb } },
              },
            },
          ],
        },
      };
      expect(ViaplayContentService.extractImdbContent(movieData)).toEqual(imdb);
    });
    it('should return null for unsuccesfull lookups', () => {
      expect(ViaplayContentService.extractImdbContent({})).toEqual(null);
    });
  });
});
