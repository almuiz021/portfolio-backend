const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('portfolio_host_data', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
