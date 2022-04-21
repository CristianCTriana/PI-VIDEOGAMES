const initialState = {
    videogames: [],
    videogameDetail: {}
}

function rootReducer(state = initialState, {type, payload}) {
    switch(type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                videogameDetail: payload
            }
        default:
            return state;
    }
}

export default rootReducer;