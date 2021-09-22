import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { search } from '../actions';
import { connect } from 'react-redux';

function SearchBox({ search }){
    let [title,setTitle] = useState('');
    let history = useHistory();
    function handleChange(e){
        setTitle(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        if(title){
            search(title);
            history.push('/search');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Search:</label>
            <input name='title' onChange={handleChange}/>
            <button type='submit'>Go!</button>
        </form>
    )
}

export default connect(null,{ search })(SearchBox);