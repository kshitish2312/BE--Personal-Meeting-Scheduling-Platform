// config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('meeting-scheduling-platform', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false, // Disable automatic timestamps (createdAt and updatedAt columns)
    },
});

module.exports = sequelize;
