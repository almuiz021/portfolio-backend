const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Educations = sequelize.define('educations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  degree: DataTypes.STRING,
  university: DataTypes.STRING,
  yearStarted: DataTypes.STRING,
  yearEnded: DataTypes.STRING,
  course: DataTypes.STRING,
});

module.exports = Educations;
