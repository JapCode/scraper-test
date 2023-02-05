const mongoose = require('mongoose');
const { config } = require('../config');

const MONGO_DB = config.dbUrl;
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: config.dbName,
};

const clientMongo = mongoose.createConnection(MONGO_DB, dbConfig);
module.exports = { clientMongo };
