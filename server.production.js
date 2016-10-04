delete process.env.BROWSER;

import express from 'express';
import logger from 'morgan';
import compression from 'compression';
import http from 'http';

const app = express(); // delcare application
const PORT = process.env.PORT || 2999;

app.use(compression()); // compress compatible files for quicker client load time
app.use(logger('dev')); // log content

// Set path to public assets
app.use('/resources', express.static('resources'));
app.use('/static', express.static('src/img'));

app.use('*', (req, res) => {
  res.status(200).send(renderFullPage());
});

// create server based on application configuration
const server = http.createServer(app);

// start the server listening on specified port
server.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening on port', PORT);
});

/**
 * Takes a react rendering in string format and returns a full html page.
 *
 * @param {string} app - react component to be rendered
 * @return {string} full html page
 */
function renderFullPage() {
  return `
    <!doctype html>
    <html>
      <head>
        <title>devreduce</title>
        <link rel="icon" href="/resources/img/icon1.png">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link rel="stylesheet" href="/resources/bundle.min.css">
      </head>
      <body>
        <div class="react-container"></div>
      </body>
      <script src="/resources/bundle.min.js"></script>
    </html>
  `;
}
