import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Game from './Game';
import Pages from './Pages';
import Options from './Options';
import { getGames, restartGenres } from '../actions';


function Home({state, getGames, restartGenres}){
    let {pageNumber} = useParams();
    let [page,setPage] = useState({
        number: "0",
        games: [],
        change: false,
        loaded: false
    })
    let [show,setShow] = useState([]);
    let [loaded,setLoaded] = useState(false);
    if(pageNumber !== page.number){
        setPage({
            ...page,
            number: pageNumber,
            change: true
        })
    }
    useEffect(() => {
        setPage({
            ...page,
            change: true
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[state]);
    useEffect(() => {
        fetch('http://localhost:3001/videogames')
          .then(res => res.json())
          .then(result => {
              result.map(game => {
                  if(game.id.length>30){
                      return game.genres = game.genres.map(genre => genre.name);
                  }
                  else{
                      return game;
                  }
              })
              getGames(result);
              setLoaded(true);
            })
          .catch(err => console.log(err));
          restartGenres();
          //eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function setPages(length){
        let pages = [];
        let i=1;
        while(length>0){
            pages.push(i);
            i++;
            length-=40;
        }
        return pages;
    }

    function setGames({created,genres,games,order,orderBy}){
        let result = games;
        if(created && created.length<2){
            if(created.length!==0 && created.length <2){
                if(created[0] === "User"){
                    result = result.filter(game => `${game.id}`.length > 30);
                } else{
                    result = result.filter(game => `${game.id}`.length < 30);
                }
            }
        }
        if(genres.length>0){
            for(let genre of genres ){
                result = result.filter(game => game.genres.includes(genre))
            }
        }
        if(order && orderBy){
            if(orderBy === 'rating'){
                if(order === 'asc'){
                    result.sort((a,b) => a[orderBy] - b[orderBy]);
    
                } else {
                    result.sort((a,b) => b[orderBy] - a[orderBy]);
                }
            } else {
                if(order === 'asc'){
                    result.sort((a,b) => a[orderBy].localeCompare(b[orderBy]));
    
                } else {
                    result.sort((a,b) => b[orderBy].localeCompare(a[orderBy]));
                }
            }
        }
        setPage({
            ...page,
            games: result,
            change: false,
            loaded: true
        })
    }

    function getPage(){
        return page.games.slice((page.number-1)*40,page.number*40);
    }
    
    if(page.change){
        setGames(state);
    }

    if(page.loaded){
        setPage({
            ...page,
            loaded: false
        })
        setShow(getPage())
    }

    let pages = setPages(page.games.length);

    return (
        <div className="container">
            <Options />
            <div className="games">
            {
                page.games.length > 0 ?
                show.map(game => {
                    return (
                        <Link key={game.id} to={`/game/${game.id}`}>
                            <Game {...game}/>
                        </Link>
                    )
                }) : loaded ? <h5>No Game Found :(</h5> : <h5>Loading...</h5>
            }
            </div>
            <Pages pages={pages} number={page.number}/>
        </div>
    );
}

function mapStateToProps(state){
    return {
        state: state
    }
}

export default connect(mapStateToProps, {getGames,restartGenres})(Home);