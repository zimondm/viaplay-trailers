const ViaplayContentService = require('./viaplay-content.service');
const fetchWrapper = require('../fetch/fetch-wrapper');

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
    it('should return a promise', () => {
      expect(
        ViaplayContentService.getMovieContent('http://localhost:3000').then
      ).toBeTruthy();
    });
  });
});
