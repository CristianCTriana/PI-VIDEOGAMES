import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        });
    }
}

export function getDetail(id){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogame/" + id);
        return dispatch({
            type: 'GET_DETAIL',
            payload: json.data
        })
    }
}

export function filterVideogameByGenre(genres){
    return {
        type: 'FILTER_BY_GENRE',
        payload: genres
    }
}

export function getGenres(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/genres");
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export function filterByOrigin(origin){
    return {
        type: 'FILTER_BY_ORIGIN',
        payload: origin
    }
}

export function sortByName(order){
    return{
        type: 'SORT_BY_NAME',
        payload: order
    }
}   

export function sortByRating(order){
    return{
        type: 'SORT_BY_RATING',
        payload: order
    }
}

export function getVideogameByName(name){
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: 'GET_VIDEOGAMES_BY_NAME',
                payload: json.data
            })
        }catch(error){
            console.log(error);
        }
    }
}

export function postVideogame(payload){
    return async function(dispatch){
        const postGame = await axios.post(`http://localhost:3001/videogame`, payload);
        return postGame;
    }
}