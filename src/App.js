import React, {useEffect, useState} from 'react';

import Movie from './components/Movie';
import logo from './images/logo.png';

const FEATURED_API =
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const FEATURED_API2 =
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";

const SEARCH_API =
"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [ movies, setMovies ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getMovies(FEATURED_API)
  }, [])

  const getMovies= (API) => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setMovies(data.results);
    })
  }

  const handleOnSubmit = (e) =>{
    e.preventDefault();

    if(searchTerm){
        getMovies(SEARCH_API + searchTerm)
    setSearchTerm("");
    }
  }

  const handleOnchange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleNextPage = (e) => {

    e.preventDefault();
    getMovies(FEATURED_API2);
    console.log('pressed');
  }

  return (
      <React.Fragment>
    <header>
    <h1 className="title">123 Movies.net <img id="logo" src={logo} alt="logo"/></h1>
    <form onSubmit={handleOnSubmit}>
        <input className="search" type="search" placeholder="Search..."
        value={searchTerm}
        onChange={handleOnchange}
        />
        </form>
      </header>
    <div className="movie-container">
      {movies.length > 0 && movies.map((movie) => 
        <Movie key={movie.id} {...movie} />
      )}
    </div>
    <button type="submit" id="nextButton" onClick={handleNextPage}>Next Page</button>
    </React.Fragment>
  );
}

export default App;
