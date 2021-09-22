import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Game from './Game';
import { connect } from 'react-redux';


function Search({ state }){
    let [loaded,setLoading] = useState(false);
    let [games,setGames] = useState([]);
    
    useEffect( () => {
        setLoading(false);
        fetch(`http://localhost:3001/videogames?name=${state.search}`)
            .then(res => res.json())
            .then(result => {
                setGames(result);
                setLoading(true);
            })
            .catch(err => {
                console.log(err)
                setLoading(true);
            })
    },[state.search])
    return (
        <div className="search">
        {loaded ?
        games.length>0 ?
        games.map(game => <Link key={game.id} to={`/game/${game.id}`}><Game {...game}/></Link>) :
        <h5>No Game Found :(</h5> :
        <h5>Loading...</h5> }
        </div>
    )
}

function mapStateToProps(state){
    return {
        state: state
    }
}

export default connect(mapStateToProps)(Search)