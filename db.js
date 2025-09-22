const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dishcovery', 'root', 'Upd@t3m3!', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
