const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const Week = sequelize.define('Week', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dayId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Week;
