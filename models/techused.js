const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const TechUsed = sequelize.define('techused', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tech: DataTypes.STRING,
});

module.exports = TechUsed;
