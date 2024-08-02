const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('PortfolioHost', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
