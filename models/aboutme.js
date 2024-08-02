const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const AboutMe = sequelize.define('AboutMe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  myImageURL: DataTypes.STRING,
  currentJob: DataTypes.STRING,
  jobDescription: DataTypes.STRING(600),
});

module.exports = AboutMe;
