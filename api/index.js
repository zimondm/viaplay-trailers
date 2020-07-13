const app = require('express')();
const trailerRoutes = require('./trailer/trailer.routes');

// Register resource (route)
app.use(trailerRoutes);

// If support for env specific ports is needed, add here.
const port = 3333;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Export the app to allow integration tests acquire a reference.
module.exports = app;
