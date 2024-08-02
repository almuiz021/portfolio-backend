const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Socials = sequelize.define('socials', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  socialMediaName: DataTypes.STRING,
  socialMediaLogo: DataTypes.STRING,
  socialMediaURL: DataTypes.STRING,
});

module.exports = Socials;
