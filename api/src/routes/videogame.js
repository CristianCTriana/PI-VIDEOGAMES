const { Router } = require('express');
const { Op } = require("sequelize");
const axios = require('axios');
const { api, Videogame, Genre } = require('../db.js');

const router = Router();

const getById = async (id) => {
    try {
        const apiInfo = await axios.get(`https://api.rawg.io/api/games/${id}?key=${api}`);
        return {
            name: apiInfo.data.name,
            id: apiInfo.data.id,
            background_image: apiInfo.data.background_image,
            genres: apiInfo.data.genres.map((el)=>{
                return {name: el.name}
            }),
            description: apiInfo.data.description,
            released: apiInfo.data.released,
            rating: apiInfo.data.rating,
            platforms: apiInfo.data.platforms.map((el)=>{
                return {name: el.platform.name}
            })
        }
    } catch (error) {
        return await Videogame.findByPk(id, {
            include:{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes:[],
                }
            }
        });
    }
}

const postData = async (name,
    description,
    released,
    rating,
    background_image,
    genres,
    platforms,
    createdInDb) => {
        const videogameCreated = await Videogame.create({
            name,
            description,
            released,
            rating,
            background_image,
            platforms,
            createdInDb
        });
        let genresId = [];
        for (let i = 0; i < genres.length; i++) {
            genresId.push(await getIdGenre(genres[i]));
        }

        await videogameCreated.addGenres(genresId);

        const game = await Videogame.findByPk(videogameCreated.toJSON().id, {
            include: Genre
        });

        return game;
    }

const getIdGenre = async (name) => {
    const genreId = await Genre.findAll({
        where: {name: name}
    });
    return genreId[0].toJSON().id;
}

//GET BY ID
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    res.send(await getById(id));
});

//POST
router.post('/', async (req, res) => {
    const {
        name,
        description,
        relased,
        rating,
        background_image,
        genres,
        platforms,
        createdInDb
    } = req.body;
    
    res.send(await postData(name,
        description,
        relased,
        rating,
        background_image,
        genres,
        platforms,
        createdInDb));
});

module.exports = router;