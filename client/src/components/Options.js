import { connect } from 'react-redux';
import { filterGenre, filterCreated, orderBy, order } from '../actions';
import { useEffect, useState } from 'react';

function Options({filterGenre,filterCreated,orderBy ,order}){
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/genres/')
            .then(res => res.json())
            .then(response => setGenres(response))
            .catch(err => console.log(err));
    },[])

    function setGenre(e){
        filterGenre(e.target.innerText);
        !e.target.className ? e.target.className= 'Selected' : e.target.className= '';
    }
    function setCreated(e){
        !e.target.className ? e.target.className= 'Selected' : e.target.className= '';
        filterCreated(e.target.innerText);
    }
    
    function setOrderBy(e){
        orderBy(e.target.value);
    }

    function setOrder(e){
        order(e.target.value);
    }

    return (
        <div className="options">
            <ul>Genres
                {genres.map(genre => <li onClick={setGenre} key={genre.id}>{genre.name}</li>)}
            </ul>
            <ul>
                Created By
                <li onClick={setCreated}>API</li>
                <li onClick={setCreated}>User</li>
            </ul>
            <label htmlFor='orderby'>Order By</label>
            <select onChange={setOrderBy} name='orderBy'>
                <option value='name'>Name</option>
                <option value='rating'>Rating</option>
            </select>
            <label htmlFor='order'>Order</label>
            <select onChange={setOrder} name='order'>
                <option value='asc'>Ascendant</option>
                <option value='desc'>Descendant</option>
            </select>
        </div>
    )
}



export default connect(null,{filterGenre,filterCreated,orderBy,order})(Options);