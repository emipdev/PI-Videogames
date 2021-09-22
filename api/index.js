
const server = require('./src/app.js');
const { conn, Videogame, Genre } = require('./src/db.js');
const { API_KEY } = process.env;
const fetch = require('node-fetch');

conn.sync({ force: true })
  .then(async () => {
    // Generos
    let dataGenres = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    dataGenres = await dataGenres.json();
    let genres = dataGenres.results.map(genre => {
      return {
        id: genre.id,
        name: genre.name
      }
    });
    await Genre.bulkCreate(genres);
    
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}).catch(err => {
  console.log(err);
});
