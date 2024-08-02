const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const ContactMe = sequelize.define('contactme', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  phoneNo: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  emailAddress: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  homeAddress: DataTypes.STRING,
});

module.exports = ContactMe;
