const initialState = {
    games: [],
    genres: [],
    orderBy: "name",
    order: "asc",
    created: [],
    search: ""
};

function reducer(state = initialState, action){
    switch(action.type){
        case 'GetGames':{
            return (
                {...state, games: action.payload}
            )
        }
        case 'FilterGenre':{
            let index = state.genres.indexOf(action.payload);
            if(index<0){
                return (
                    {...state, genres: [...state.genres,action.payload]}
                );
            } else {
                return (
                    {...state, genres: state.genres.filter(genre => genre !== action.payload)}
                )
            }
        }
        case 'FilterCreated':{
            if(state.created.indexOf(action.payload)>-1){
                return (
                    {...state, created: state.created.filter(instance => instance !== action.payload)}
                    )
            } else {
                return (
                    {...state, created: [...state.created,action.payload]}
                );
            }
        }
        case 'Order':{
            return (
                {...state,order: action.payload}
            )
        }
        case 'OrderBy':{
            return (
                {...state, orderBy: action.payload}
            );
        }
        case 'RestartGenres':{
            return ({
                ...state, genres: [],created: [],orderBy: "name", order: "asc"
            })
        }
        case 'Search':{
            return ({
                ...state, search: action.payload
            })
        }
        default : {
            return state;
        }
    }
}

export default reducer;