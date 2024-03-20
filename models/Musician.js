const {Sequelize, sequelize} = require('../db');

let Musician = sequelize.define('Musician', {
    name: DataTypes.STRING,
    instrument: DataTypes.STRING
});

module.exports = {
    Musician
};