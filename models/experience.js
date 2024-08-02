const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Experience = sequelize.define('experience', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  companyName: DataTypes.STRING,
  started: DataTypes.STRING,
  finished: DataTypes.STRING,
  designation: DataTypes.STRING,
});

module.exports = Experience;
