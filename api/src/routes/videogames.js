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
    let apiData = apiPage1.data.results.concat(apiPage2.data.results.concat(apiPage3.data.results.concat(apiPage4.data.results)));

    apiData = apiData.map((el) => {
        return {
            background_image: el.background_image,
            name: el.name,
            genres: el.genres.map(el => {return {name: el.name}})
        }
    });
    return apiData;
}

const apiNameGetData = async (name) => {
    const dataApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${api}&page_size=15`);
    const dataInfo = dataApi.data.results.map((el) => {
        return {
            background_image: el.background_image,
            name: el.name,
            genres: el.genres.map(el => {return {name: el.name}})
        }
    });
    return dataInfo;
}

/*const allDataApi = async ()=> {
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
            }),
            background_image: data.data.background_image
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
            platforms: dataToDb[i].platforms,
            background_image: dataToDb[i].background_image
        });
    }
}

const allData = async () => {
    let dbData = await Videogame.findAll();
    if (dbData.length === 0) {
        await apiToDb();
        dbData = await Videogame.findAll();
    }
    return dbData;//devolver solo los datos necesarios
}

const getByName = async (name)=> {
    let data = await Videogame.findAll();
    if(data.length > 0){
        data = await Videogame.findAll({
            where: {
                name: {[Op.substring] : name}
            }
        });
        data = data.map(e => e.toJSON());
    }else{
        await apiToDb();
        data = await getByName(name);
    }
    return data;
}*/

//GET
router.get('/', async (req, res) => {
    const {name} = req.query;
    if(name){
        res.send(await apiNameGetData(name));
    }else{
        res.send((await apiGetData()));
    }
});

module.exports = router;