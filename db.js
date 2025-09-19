const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dishcovery', 'root', '181270es', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
