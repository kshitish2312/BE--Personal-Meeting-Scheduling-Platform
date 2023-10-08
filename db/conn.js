// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`meeting-scheduling-platform`, 'root', '', {
  host: 'localhost', // your database host
  dialect: 'mysql', // specify the dialect (e.g., postgres, mysql, sqlite),
  port: 3306,
});

module.exports = sequelize;
