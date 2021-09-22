import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';

function Nav(){
    return (
        <nav>
            <div>
                <Link className="home" to='/videogames/1'>Home</Link>
                <Link to='/create'>Create Videogame</Link>
            </div>
            <SearchBox/>
        </nav>
    )
}

export default Nav;