const { Router } = require('express');

const videogamesRouter = require('./videogames.js');
const genresRouter = require('./genres.js');

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to the database server :v');
})
router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);

module.exports = router;
