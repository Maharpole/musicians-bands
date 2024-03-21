const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")

Band.hasMany(Musician, { foreignKey: 'bandId', as: 'Musicians' });
Musician.belongsTo(Band, { foreignKey: 'bandId', as: 'Band' });

module.exports = {
    Band,
    Musician,
    Song
};
