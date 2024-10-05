const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Educations = sequelize.define(
  'educations',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    eduID: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    degree: DataTypes.STRING,
    university: DataTypes.STRING,
    yearStarted: DataTypes.STRING,
    yearEnded: DataTypes.STRING,
    course: DataTypes.STRING,
  },
  {
    hooks: {
      afterCreate: async education => {
        education.eduID = education.id;
        await education.save();
      },
    },
  },
);

module.exports = Educations;
