const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Projects = sequelize.define(
  'projects',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    projectID: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    imageURL: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING(500),
    projectURL: DataTypes.STRING,
  },
  {
    hooks: {
      afterCreate: async project => {
        project.projectID = project.id;
        await project.save();
      },
    },
  },
);

module.exports = Projects;
