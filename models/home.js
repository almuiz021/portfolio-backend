const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Home = sequelize.define('home', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  logoImgURL: DataTypes.STRING,
  logoTextURL: DataTypes.STRING,
  heroImageURL: DataTypes.STRING,
  myRole: DataTypes.STRING,
  heroName: DataTypes.STRING,
});
