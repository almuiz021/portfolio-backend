const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('portfoliohost', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
