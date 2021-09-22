import image from '../image.png';
import { Link } from 'react-router-dom';

function Landing(){
    return (
        <div className="landing">
            <p>Individual Project</p>
            <h1>VIDEOGAMES</h1>
            <img src={image} alt="videogames pic"/>
            <Link to='/videogames/1'><button>START</button></Link>
        </div>
    );
}

export default Landing;