const { Router } = require('express');
const { Op } = require("sequelize");
const axios = require('axios');
const { api, Videogame, Genre} = require('../db.js');

const router = Router();

//TODOS LOS VIDEOGAMES
//API
const apiGetData = async () => {
    const apiPage1 = await axios.get(`https://api.rawg.io/api/games?key=${api}&page=1&page_size=40`);
    const apiPage2 = await axios.get(`https://api.rawg.io/api/games?key=${api}&page=2&page_size=40`);
    const apiPage3 = await axios.get(`https://api.rawg.io/api/games?key=${api}&page=5&page_size=20`);
    let apiData = apiPage1.data.results.concat(apiPage2.data.results.concat(apiPage3.data.results));

    return apiData.map((el) => {
        return {
            id: el.id,
            name: el.name,
            background_image: el.background_image,
            rating: el.rating,
            genres: el.genres.map(el => {return {name: el.name}})
        }
    });
}

//DB
const dbGetData = async () => {
    return await Videogame.findAll({
        attributes: ["background_image", "name", "id", "rating", "createdInDb"],
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes:[],
            }
        }
    });
}

//VIDEOGAMES POR NOMBRE
//API
const apiNameGetData = async (name) => {
    const dataApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${api}&page_size=15`);
    const dataInfo = dataApi.data.results.map((el) => {
        return {
            id: el.id,
            name: el.name,
            background_image: el.background_image,
            rating: el.rating,
            genres: el.genres.map(el => {return {name: el.name}})
        }
    });
    return dataInfo;
}

//DB
const dbNameGetData = async (name) => {
    return await Videogame.findAll({
        where: {
            name: {[Op.substring]: name}
        },
        attributes: ["id", "name" ,"background_image", "rating", "createdInDb"],
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes:[],
            }
        }
    });
}

//Union db y api
const joinData = async (name) => {
    if(name){
        const apiData = await apiNameGetData(name);
        const dbData = await dbNameGetData(name);
        return (dbData.concat(apiData));
    }else{
        const apiData = await apiGetData();
        const dbData = await dbGetData();
        return (dbData.concat(apiData));
    }
}

//GET
router.get('/', async (req, res) => {
    const {name} = req.query;
    if(name){
        res.send(await joinData(name));
    }else{
        res.send((await joinData()));
    }
});

module.exports = router;