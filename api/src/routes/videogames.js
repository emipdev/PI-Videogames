const { Router } = require('express');
const { Videogame,Genre } = require('../db.js');
const { API_KEY } = process.env;
const fetch = require('node-fetch');
const router = Router();

function map(array){
    return array.map(game => {
        return {
            id: game.id,
            name: game.name,
            release_date: game.released,
            rating: game.rating,
            platforms: game.platforms.map(plataformas => plataformas.platform.name),
            genres: game.genres.map(genre => genre.name),
            background_image: game.background_image
        }
    })
}
async function getGames(){
    try{
    let api1 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`);
    let api2 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`);
    let api3 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=40`);
    api1 = await api1.json();
    api2 = await api2.json();
    api3 = await api3.json();
    return [
        ... map(api1.results),
        ... map(api2.results),
        ... map(api3.results).slice(0,20)
    ];
    }
    catch(err){
        console.log(err);
    }
}

router.get('/',async (req, res) => {
    let dbgames, apigames;
    let {name} = req.query;
    try{
        dbgames = await Videogame.findAll({include: [Genre]});
        apigames = await getGames();
    }
    catch(err){
        console.log(err);
    }
    let allgames = [...dbgames, ...apigames];
    if(name){
        let result = allgames.filter(game => game.name.toUpperCase().includes(name.toUpperCase()));
        if(result.length > 0){
            result = result.slice(0,15);
            res.json(result);
        } else {
            res.status(404).send('No hay ningun juego con ese nombre!');
        }
    } else {
        res.json(allgames);
    }
})

router.get('/:idVideogame',async (req, res) => {
    let id = req.params.idVideogame;
    if(!isNaN(id)){
        let result;
        try{
            let data = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            data = await data.json();
            result = {
                id: data.id,
                name: data.name,
                release_date: data.released,
                rating: data.rating,
                platforms: data.platforms.map(plataformas => plataformas.platform.name),
                genres: data.genres.map(genre => genre.name),
                background_image: data.background_image,
                description: data.description
            }
        }
        catch(err){
            console.log(err);
        }
        if(result!=null){
            res.json(result);
        } else {
            res.send(`The Videogame ID you're searching for doesn't exists!`);
        }
    } else {
        res.send('The Videogame ID is invalid!');
    }
})

router.post('/',async (req, res) => {
    let {name,description,release_date,platforms,rating,background_image,genres} = req.body;
    genres = genres.slice(1).split(',');
    platforms = platforms.split(',');
    let result;
    try{
        const newGame = await Videogame.create({
            name,
            description,
            release_date,
            rating,
            platforms,
            background_image
        });
        for(let genre of genres){
            let newGenre = await Genre.findOne({where: {name: genre}});
            await newGame.addGenre(newGenre);
        }
        result = await Videogame.findOne({where: {id: newGame.id}, include: [Genre], attributes: { exclude: ['createdAt','updatedAt'] }});
    }
    catch(err){
        console.log(err);
    }
    res.json(result);
})

module.exports = router;