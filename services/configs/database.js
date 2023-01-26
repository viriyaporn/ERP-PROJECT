const { Sequelize } = require('sequelize');

const connection = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: process.env.DEV === 'true' ? console.log : false,
});

(async () => {
  try {
    await connection.authenticate();
    console.log('database connection established!');
  } catch (e) {
    console.error('DATABASE CONNECTION ERROR:', e);
  }
})();

module.exports = connection;