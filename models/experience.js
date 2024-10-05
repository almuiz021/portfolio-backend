const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Experience = sequelize.define(
  'experience',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    expID: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    companyName: DataTypes.STRING,
    started: DataTypes.STRING,
    finished: DataTypes.STRING,
    designation: DataTypes.STRING,
  },
  {
    hooks: {
      afterCreate: async experience => {
        experience.expID = experience.id;
        await experience.save();
      },
    },
  },
);

module.exports = Experience;
