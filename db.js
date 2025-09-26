const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dishcovery', 'root', '0121maeric', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
