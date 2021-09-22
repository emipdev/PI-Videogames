

function Game({name, background_image, genres, id}){
    genres = genres.slice(0,3);
    return (
        <div className="game">
            <h2>{name}</h2>
            <img src={background_image} alt="game"/>
            <ul>
                {genres.map(genre => {
                    return (
                        <li key={`${genre}${id}`}>{genre}</li>
                        )
                    })}
            </ul>
        </div>
    );
}

export default Game;