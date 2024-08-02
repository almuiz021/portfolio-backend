const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Duties = sequelize.define('duties', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  duty: DataTypes.STRING(300),
});

module.exports = Duties;
