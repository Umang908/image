// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load .env variables

// Create a new instance of Sequelize using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql', // default to MySQL if no dialect is provided
    port: process.env.DB_PORT || 3306, // default to port 3306
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,  // Adjust timeout here
      idle: 10000
    }
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;