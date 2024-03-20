const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('../db');

let Band = sequelize.define('Band', {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
});

module.exports = {
    Band
};