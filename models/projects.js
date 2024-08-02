const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Projects = sequelize.define('projects', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  imageURL: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.STRING(500),
  projectURL: DataTypes.STRING,
});

module.exports = Projects;
