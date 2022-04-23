const initialState = {
    videogames: [],
    allVideogames: [],
    videogameDetail: {},
    allGenres: []
}

function rootReducer(state = initialState, {type, payload}) {
    switch(type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: payload,
                allVideogames: payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                videogameDetail: payload
            }
        case 'FILTER_BY_GENRE':
            const allVideogames = state.allVideogames;
            const genreFilter = payload === 'All'? allVideogames:allVideogames.filter((v)=>{
                for (let i = 0; i < v.genres.length; i++) {
                    if(v.genres[i].name===payload){return true}
                }
            });
            return {
                ...state,
                videogames: genreFilter
            }
        case 'GET_GENRES':
            return {
                ...state,
                allGenres: payload
            }
        case 'FILTER_BY_ORIGIN':
            const allVideogames2 = state.allVideogames;
            const originFilter = payload === 'Db'? allVideogames2.filter(v=>v.createdInDb):allVideogames2.filter(v=>!v.createdInDb);
            return {
                ...state,
                videogames: payload === 'All'? allVideogames2:originFilter
            }
        case 'SORT_BY_NAME':
            let sortVideogameByName = payload === 'a-z'? state.videogames.sort((a, b)=>{
                if(a.name > b.name){
                    return 1
                }
                if(a.name < b.name){
                    return -1
                }
                return 0
            }): state.videogames.sort((a, b)=>{
                if(a.name > b.name){
                    return -1
                }
                if(a.name < b.name){
                    return 1
                }
                return 0
            })
            return{
                ...state,
                videogames: sortVideogameByName
            }
        case 'SORT_BY_RATING':
            let sortVideogameByRating = payload === 'ascendente'? state.videogames.sort((a, b)=>{
                return b.rating - a.rating;
            }): state.videogames.sort((a, b)=>{
                return a.rating - b.rating;
            })
            return{
                ...state,
                videogames: sortVideogameByRating
            }
        case 'GET_VIDEOGAMES_BY_NAME':
            return{
                ...state,
                videogames: payload
            }
        case 'POST_VIDEOGAME':
            return{
                ...state
            }
        default:
            return state;
    }
}

export default rootReducer;