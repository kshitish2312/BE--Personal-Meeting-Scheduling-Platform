const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const User = require('./User'); // Import User model
const Week = require('./Week'); // Import Week model
const { weekModel } = require('.');

const UserAvailability = sequelize.define('UserAvailability', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  week_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Week,
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  startdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  enddate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  starttime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endtime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserAvailability.belongsTo(Week, { foreignKey: 'week_id' });
UserAvailability.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserAvailability;
