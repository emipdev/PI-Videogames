import { Link } from 'react-router-dom';

function Pages({pages,number}){
    return (
        <div className="pages">
            {pages.map(page => <Link className={Number(number) === page ? "active" : ""} key={page} to={`/videogames/${page}`}>{page}</Link>)}
        </div>
    )
}

export default Pages;