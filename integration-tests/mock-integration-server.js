const express = require('express');

let app = express();

// respond to root queries, used as a health check
app.get('/', (req, res) => res.sendStatus(200));

// Viaplay movie content mock endpoint
app.get('/content', (req, res) => {
  res.status(200).send({});
});

app.listen(1337, () => {
  console.log(`
  ----------------------------------------------------
  Local Mock Integration Server listening on port 1337
  ----------------------------------------------------
  `);
});
