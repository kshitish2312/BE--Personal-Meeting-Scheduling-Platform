const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn'); // Assuming you've set up your Sequelize configuration

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensure the email is in a valid format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true, // Ensure the phone number contains only digits
    },
  },
  otp: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

module.exports = User;
