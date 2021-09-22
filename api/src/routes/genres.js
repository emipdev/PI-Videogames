const { Router } = require('express');
const { Genre } = require('../db.js');

const router = Router();

router.get('/',async (req,res) => {
    let genres = await Genre.findAll();
    res.json(genres);
})

module.exports = router;