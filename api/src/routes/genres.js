const { Router } = require('express');
const { Op } = require("sequelize");
const axios = require('axios');
const { api, Genre } = require('../db.js');

const router = Router();

const apiGenres = async () => {
    const apiPage1 = await axios.get(`https://api.rawg.io/api/games?key=${api}&page=1&page_size=40`);
    const apiPage2 = await axios.get(`https://api.rawg.io/api/games?key=${api}&page=2&page_size=40`);
    const apiPage3 = await axios.get(`https://api.rawg.io/api/games?key=${api}&page=5&page_size=20`);
    const apiData = apiPage1.data.results.concat(apiPage2.data.results.concat(apiPage3.data.results));
    return apiData;
}

const apiToDb = async () => {
    const dataToDb = await apiGenres();
    for (let i = 0; i < dataToDb.length; i++) {
        for (let j = 0; j < dataToDb[i].genres.length; j++) {
            await Genre.findOrCreate({
                where: {name: dataToDb[i].genres[j].name}
            });
        }
    }
    return await Genre.findAll();
}

router.get('/', async (req, res) => {
    res.send(await apiToDb());
});

module.exports = router;