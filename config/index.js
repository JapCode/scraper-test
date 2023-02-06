require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  local: process.env.DEV_ENVIRONMENT,
  port: process.env.PORT || 3000,
  dbUrl: process.env.MONGO_DB_URI,
  tokenSecret: process.env.SECRET_JWT,
  baseUrl: process.env.BASE_URL_SCRAPING,
  expirationTime: process.env.TOKEN_EXPIRATION,
};

module.exports = { config };
