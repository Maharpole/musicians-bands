const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    let TestBand, TestMusician; // Declare variables to hold instances for use in multiple tests

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        TestBand = await Band.create({ name: "TestUser", genre: "TestGenre" })
        expect(TestBand.name).toBe('TestUser');
        expect(TestBand.genre).toBe('TestGenre');
    })

    test('can create a Musician', async () => {
        TestMusician = await Musician.create({ name: "TestMusician", instrument: "TestInstrument" })
        expect(TestMusician.name).toBe('TestMusician');
        expect(TestMusician.instrument).toBe('TestInstrument');
    })

    test('can update a Band', async () => {
        await Band.update({ name: 'TestUser1' }, { where: { name: 'TestUser' } });
        const updatedBand = await Band.findOne({ where: { name: 'TestUser1' } });
        expect(updatedBand.name).toBe('TestUser1');
    })

    test('can update a Musician', async () => {
        await Musician.update({ name: 'UpdatedMusician' }, { where: { name: 'TestMusician' } });
        const updatedMusician = await Musician.findOne({ where: { name: 'UpdatedMusician' } });
        expect(updatedMusician.name).toBe('UpdatedMusician');
    })

    test('can delete a Band', async () => {
        await Band.destroy({ where: { name: 'TestUser1' } });
        const deletedBand = await Band.findOne({ where: { name: 'TestUser1' } });
        expect(deletedBand).toBeNull();
    })

    test('can delete a Musician', async () => {
        await Musician.destroy({ where: { name: 'UpdatedMusician' } });
        const deletedMusician = await Musician.findOne({ where: { name: 'UpdatedMusician' } });
        expect(deletedMusician).toBeNull();
    })
})

describe('Band and Musician Association', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        // Create test data
        const band = await Band.create({ name: "The Testers", genre: "Rock" });
        await Musician.create({ name: "Guitarist", instrument: "Guitar", bandId: band.id });
        await Musician.create({ name: "Drummer", instrument: "Drums", bandId: band.id });
    });

    test('bands should have multiple musicians', async () => {
        const bands = await Band.findAll({
            include: [{
                model: Musician,
                as: 'Musicians'
            }]
        });

        for (let band of bands) {
            const musicians = await band.getMusicians();
            expect(musicians.length).toBeGreaterThan(0);
            musicians.forEach(musician => {
                expect(musician.bandId).toBe(band.id);
            });
        }
    });
});

describe('Band and Song Associations', () => {
    let testBand, song1, song2;

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        testBand = await Band.create({ name: "The Example Band", genre: "Indie" });
        song1 = await Song.create({ title: "First Song", duration: "3:00" });
        song2 = await Song.create({ title: "Second Song", duration: "4:00" });

        await testBand.addSongs([song1, song2]);
    });

    test('a band can have multiple songs', async () => {
        const foundBand = await Band.findByPk(testBand.id, {
            include: [{
                model: Song,
                as: 'Songs'
            }]
        });

        expect(foundBand.Songs.length).toBe(2);
        expect(foundBand.Songs.map(song => song.title)).toEqual(expect.arrayContaining(["First Song", "Second Song"]));
    });

    test('a song can belong to multiple bands', async () => {
        const anotherBand = await Band.create({ name: "Another Band", genre: "Rock" });
        await song1.addBand(anotherBand);

        const foundSong = await Song.findByPk(song1.id, {
            include: [{
                model: Band,
                as: 'Bands'
            }]
        });

        expect(foundSong.Bands.length).toBeGreaterThan(1);
        expect(foundSong.Bands.map(band => band.name)).toEqual(expect.arrayContaining(["The Example Band", "Another Band"]));
    });
});
