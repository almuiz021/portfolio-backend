const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const TechnicalSkills = sequelize.define('technicalskills', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // skillIconURL: DataTypes.STRING,
  skillTitle: DataTypes.STRING,
});

module.exports = TechnicalSkills;
