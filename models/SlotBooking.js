const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const User = require('./User'); // Import User model

const SlotBooking = sequelize.define('SlotBooking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  receiver_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  event_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  isRescheduled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

SlotBooking.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
SlotBooking.belongsTo(User, { foreignKey: 'receiver_Id', as: 'reciever' });

module.exports = SlotBooking;
