const fetch = require('node-fetch');
// Default exports can be hard to mock/stub, therefore reexport this here for use in our service modules.
module.exports = {
  fetch,
};
