const {Sequelize, sequelize} = require('../db');

let Musician = sequelize.define('Musician', {
    name: Sequelize.STRING,
    instrument: Sequelize.STRING
});

module.exports = {
    Musician
};