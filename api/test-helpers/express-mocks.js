// Mock object to allow testing of express controller middlewares.
function mockRes() {
  this._status = null;
  this._responseBody = null;
  this.sendStatus = (s) => (this._status = s);
  this.status = (s) => (this._status = s) && this;
  this.send = (r) => {
    this._responseBody = r;
  };
  this.locals = {};
  this._headers = {};
  this.set = (key, value) => {
    this._headers[key] = value;
  };
}

module.exports = {
  mockRes,
};
