const { Router } = require('express');
const { Op } = require("sequelize");
const axios = require('axios');
const { api, Videogame } = require('../db.js');

const router = Router();

const apiGetData = async () => {
    const apiPage1 = await axios.get(`https://api.rawg.io/api/games?key=${api}&page=1&page_size=1`);
    const apiPage2 = await axios.get(`https://api.rawg.io/api/games?key=${api}&page=2&page_size=1`);
    const apiPage3 = await axios.get(`https://api.rawg.io/api/games?key=${api}&page=3&page_size=1`);
    const apiPage4 = await axios.get(`https://api.rawg.io/api/games?key=${api}&page=4&page_size=1`);
    const apiData = apiPage1.data.results.concat(apiPage2.data.results.concat(apiPage3.data.results.concat(apiPage4.data.results)));
    return apiData;
}

const allDataApi = async ()=> {
    const apiData = await apiGetData();
    for (let i = 0; i < apiData.length; i++) {
        const data = await axios.get(`https://api.rawg.io/api/games/${apiData[i].id}?key=${api}`);
        apiData[i] = {
            id: data.data.id,
            name: data.data.name,
            description: data.data.description,
            released: data.data.released,
            rating: data.data.rating,
            platforms: data.data.platforms.map((el)=>{
                return {name: el.platform.name}
            })
        }
    }
    return apiData;
}

const apiToDb = async () => {
    const dataToDb = await allDataApi();
    for (let i = 0; i < dataToDb.length; i++) {
        await Videogame.create({
            id: dataToDb[i].id,
            name: dataToDb[i].name,
            description: dataToDb[i].description,
            released: dataToDb[i].released,
            rating: dataToDb[i].rating,
            platforms: dataToDb[i].platforms
        });
    }
}

const allData = async () => {
    let dbData = await Videogame.findAll();
    if (dbData.length > 0) {
        return dbData;
    }else{
        await apiToDb();
        dbData = await Videogame.findAll();
    }
    return dbData;
}

const getById = async (id)=> {
    let data = await Videogame.findAll();
    if(data.length > 0){
        data = await Videogame.findByPk(id);
    }else{
        await apiToDb();
        data = await getById(id);
    }
    return data;
}

//GET BY ID
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    if(id){
        res.send(await getById(id));
    }else{
        res.send(await allData());
    }
});

module.exports = router;