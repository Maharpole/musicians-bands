const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('../db');

let Band = sequelize.define('Band', {
    name: Sequelize.STRING,
    genre: Sequelize.STRING,
});

module.exports = {
    Band
};