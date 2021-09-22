
function GameDetail({name,genres,rating,platforms,description,release_date,background_image}){
    platforms = platforms.join(', ')
    genres = genres.join(', ')
    description = description.split('<br />')
    for(let i=0;i<description.length;i++){
        description[i] = description[i].replace(/<\/?[^>]+(>|$)/g, '')
    }
    return (
        <div className="detail">
            <h1>{name}</h1>
            {background_image ? <img src={background_image} alt='game'/> : null}
            <div>{description.map((text,i) => <p key={"t"+i}>{text}</p>)}</div>
            <p><span>Rating:</span>{rating}</p>
            <p><span>Release Date:</span>{release_date}</p>
            <div><p>Genres:</p><p>{genres}</p></div>
            <div>
                <p>
                Platforms:
                </p>
                <p>{platforms}</p>
            </div>
        </div>
    )
}

export default GameDetail;