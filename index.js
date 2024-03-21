//IMPORTS//

const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")

//ASSOCIATIONS//

Band.hasMany(Musician, { foreignKey: 'bandId', as: 'Musicians' });
Musician.belongsTo(Band, { foreignKey: 'bandId', as: 'Band' });
Band.belongsToMany(Song, { through: 'BandSongs', as: 'Songs' });
Song.belongsToMany(Band, { through: 'BandSongs', as: 'Bands' });

//EXPORTS//

module.exports = {
    Band,
    Musician,
    Song
};
