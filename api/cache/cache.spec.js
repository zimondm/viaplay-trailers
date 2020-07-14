const { _testHandle, cacheGet, cacheSet } = require('./cache');
const { mockRes } = require('../test-helpers/express-mocks');
describe('cache', () => {
  cacheGetMock = jasmine.createSpy('get');
  cacheSetMock = jasmine.createSpy('set');
  beforeAll(() => {
    spyOn(_testHandle, 'get').and.callFake(cacheGetMock);
    spyOn(_testHandle, 'set').and.callFake(cacheSetMock);
  });
  beforeEach(() => {
    // Reset call state between tests since the spies/mocks are shared for the whole spec.
    cacheGetMock.calls.reset();
    cacheSetMock.calls.reset();
  });
  describe('cacheGet', () => {
    it('should set the cacheHit flag on a cacheHit', () => {
      const req = { originalUrl: '' };
      const res = new mockRes();
      cacheGetMock.and.returnValue({ status: 200, body: {} });
      cacheGet(req, res, () => {});
      expect(res.locals.cacheHit).toBeTrue();
    });
    it('should send a response immediately on a cache hit', () => {
      const req = { originalUrl: '' };
      const res = new mockRes();
      res.send = jasmine.createSpy('send');
      const body = {};
      cacheGetMock.and.returnValue({ status: 200, body });
      cacheGet(req, res, () => {});
      expect(res.send).toHaveBeenCalledWith(body);
    });
    it('should call next on a cache miss', () => {
      const req = { originalUrl: '' };
      const res = new mockRes();
      const next = jasmine.createSpy('next');
      cacheGetMock.and.returnValue(null);
      cacheGet(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('cacheSet', () => {
    it('should override the send method on the response object', () => {
      const send = () => {};
      const res = { send };
      cacheSet()({}, res, () => {});
      expect(res.send === send).not.toBeTrue();
    });
    it('should call next', () => {
      const send = () => {};
      const res = { send };
      const next = jasmine.createSpy('next');
      cacheSet()({}, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('should save response send param to cache when overriden method is called', () => {
      const send = () => {};
      const res = { statusCode: 200, send, locals: {} };
      const req = { originalUrl: 'fakekey' };
      cacheSet()(req, res, () => {});
      const body = {};
      res.send(body);
      expect(cacheSetMock).toHaveBeenCalledWith(
        'fakekey',
        { status: 200, body },
        300
      );
    });
    it('should not save response if response is result of cache hit', () => {
      const send = () => {};
      const res = { statusCode: 200, send, locals: { cacheHit: true } };
      const req = { originalUrl: 'fakekey' };
      cacheSet()(req, res, () => {});
      const body = {};
      res.send(body);
      expect(cacheSetMock).not.toHaveBeenCalled();
    });
    it('should call the original send function with response body', () => {
      const send = jasmine.createSpy('send');
      const res = { statusCode: 200, send, locals: {} };
      const req = { originalUrl: 'fakekey' };
      cacheSet()(req, res, () => {});
      const body = {};
      res.send(body);
      expect(send).toHaveBeenCalledWith(body);
    });
  });
});
