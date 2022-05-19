const { db } = require('../utils/database');
const { DataTypes } = require('sequelize');

const User = db.define('user', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        defaultValue: 'active',
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        defaultValue: 'normal',
        type: DataTypes.STRING
    }
});

module.exports = { User };