const {Sequelize, sequelize} = require('../db');

// TODO - define the Song model
let Song = sequelize.define('Song', {
    title: Sequelize.STRING,
    year: Sequelize.INTEGER,
    length: Sequelize.INTEGER
});

module.exports = {
    Song
};