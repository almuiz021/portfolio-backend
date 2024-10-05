const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Duties = sequelize.define(
  'duties',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    dutyID: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    duty: DataTypes.STRING(300),
  },
  {
    hooks: {
      afterCreate: async duty => {
        duty.dutyID = duty.id;
        await duty.save();
      },
    },
  },
);

module.exports = Duties;
