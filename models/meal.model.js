const { db } = require('../utils/database');
const { DataTypes } = require('sequelize');

const Meal = db.define('meal', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    restaurantId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        allowNull: false,
        defaultValue: 'active',
        type: DataTypes.STRING
    }
});

module.exports = { Meal };