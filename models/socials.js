const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Socials = sequelize.define(
  'socials',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    socialID: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    socialMediaName: DataTypes.STRING,
    socialMediaLogo: DataTypes.STRING,
    socialMediaURL: DataTypes.STRING,
  },
  {
    hooks: {
      afterCreate: async social => {
        social.socialID = social.id;
        await social.save();
      },
    },
  },
);

module.exports = Socials;
