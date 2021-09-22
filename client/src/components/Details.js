import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import GameDetail from './GameDetail';

function Details({games}){
    const {id} = useParams();
    let [game,setGame] = useState(null);
    let [loaded,setLoading] = useState(false);
    let [gameDB] = games.filter(game => `${game.id}` === id && game.id.length > 30);
    
    useEffect(() => {
        if(gameDB && !game){
            setGame(gameDB);
            setLoading(true);
        } else{
            let mounted = true;
            fetch(`http://localhost:3001/videogames/${id}`)
                .then(res => res.json())
                .then(result => {
                    if(mounted){
                        setGame(result);
                        setLoading(true);
                    }
                })
                .catch(err => {
                    if(mounted){
                        console.log(err);
                        setLoading(true);
                    }
                });
                return function cleanup() {
                    mounted = false
                }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        game ? 
        <GameDetail {...game}/>
        :
        <h1>
            {loaded ? 'Game not found.' : 'Loading...'}
        </h1>
    )
}

function mapStateToProps(state){
    return {
        games: state.games
    }
}

export default connect(mapStateToProps)(Details);