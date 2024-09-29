// models/Image.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the Image model
const Image = sequelize.define('images', {
    // Define the columns of the Image table
    image_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_data: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
});

// Sync the model with the database (create the table if it doesn't exist)
// Image.sync();

module.exports = Image;
