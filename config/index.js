require('dotenv').config();

const config = {
  // Define el entorno de ejecución actual
  env: process.env.NODE_ENV || 'dev',

  // Indica si el entorno actual es producción
  isProd: process.env.NODE_ENV === 'production',

  // Define el entorno de desarrollo local
  local: process.env.DEV_ENVIRONMENT,

  // Define el puerto que se usará para la aplicación
  port: process.env.PORT || 3000,

  dbUrl: process.env.MONGO_DB_URI,
};

module.exports = { config };
