const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const ContactUs = sequelize.define('contactus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  emailAddress: {
    type: DataTypes.STRING,
  },
  message: DataTypes.STRING(1000),
});

module.exports = ContactUs;
