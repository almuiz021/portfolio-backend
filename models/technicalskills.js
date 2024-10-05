const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const TechnicalSkills = sequelize.define(
  'technicalskills',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    skillID: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    skillTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      afterCreate: async skill => {
        skill.skillID = skill.id;
        await skill.save();
      },
    },
  },
);

module.exports = TechnicalSkills;
