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