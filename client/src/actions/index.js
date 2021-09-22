
export const getGames = (payload) => {
    return ({
        type: "GetGames",
        payload
    })
}

export const filterGenre = (payload) => {
    return ({
        type: "FilterGenre",
        payload
    })
}

export const filterCreated = (payload) => {
    return ({
        type: "FilterCreated",
        payload
    })
}

export const orderBy = (payload) => {
    return ({
        type: "OrderBy",
        payload
    })
}

export const order = (payload) => {
    return ({
        type: 'Order',
        payload
    })
}

export const restartGenres = () => {
    return ({
        type: 'RestartGenres'
    })
}

export const search = (payload) => {
    return ({
        type: 'Search',
        payload
    })
}