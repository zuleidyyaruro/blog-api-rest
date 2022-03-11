const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define('comment', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        // active|deleted
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active'
    }
}, {
    timestamps: false
});

module.exports = Comment;