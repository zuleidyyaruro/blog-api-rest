const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const Post = sequelize.define('post', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    status:{
        // active|deleted
        type:DataTypes.STRING(10),
        allowNull: false,
        defaultValue:'active'
    }
}, {
    timestamps: false,
}
);

module.exports = Post;