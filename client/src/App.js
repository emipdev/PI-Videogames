import { Route } from 'react-router-dom';
import Landing from './components/Landing';
import Videogames from './components/Videogames';
import Create from './components/Create';
import Details from './components/Details';
import Nav from './components/Nav';
import Search from './components/Search';

function App() {
  return (
    <>
      <Nav />
      <Route exact path='/'>
        <Landing/>
      </Route>
      <Route path='/videogames/:pageNumber'>
        <Videogames/>
      </Route>
      <Route path='/create'>
        <Create/>
      </Route>
      <Route path='/game/:id'>
        <Details/>
      </Route>
      <Route path='/search'>
        <Search/>
      </Route>
    </>
  );
}



export default App;
