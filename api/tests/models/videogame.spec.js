const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

const juego = {
  name: "Age of Empires",
  description: "Es el mejor juego de la historia",
  release_date: "31/02/2001",
  rating: 4.8,
  plataforms: ["PC"]
}

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({...juego,name: null})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if description is null', (done) => {
        Videogame.create({...juego,description: null})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should throw an error if plataforms is null', (done) => {
        Videogame.create({...juego,plataforms: null})
          .then(() => done(new Error('It requires a valid plataform')))
          .catch(() => done());
      });
      it('should work when its a valid game', () => {
        Videogame.create(juego);
      });
    });
  });
});
