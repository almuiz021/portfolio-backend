const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const TechUsed = sequelize.define(
  'techused',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    techID: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    tech: DataTypes.STRING,
  },
  {
    hooks: {
      afterCreate: async tech => {
        tech.techID = tech.id;
        await tech.save();
      },
    },
  },
);

module.exports = TechUsed;
