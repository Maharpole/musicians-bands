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
