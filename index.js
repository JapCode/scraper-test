require('dotenv').config();
const { config } = require('./config');

const PORT = config.port;
const createApp = require('./app');

const app = createApp();
app
  .then((server) => {
    server.listen(PORT, (err) => {
      if (err) {
        console.error('Error: ', err);
      }
      console.log('Server listening on Port', PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
