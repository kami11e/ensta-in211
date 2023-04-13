import { useEffect, useState } from 'react';
import './Movies.css';
// import { Fragment } from 'react';
// import { createConnection } from './chat.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
const api_key = 'a0a7e40dc8162ed7e37aa2fc97db5654';
const FILE_PATH = 'https://image.tmdb.org/t/p/w200';

const useFetchMovies = (page) => {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);
  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=' + api_key + '&page=' + page)
      .then((response) => {
        // setMovies(movies.concat(response.data.results));
        setMovies(response.data.results);
      })
      .catch((error) => {
        // Do something if call failed
        setMoviesLoadingError('An error occured while fetching movies.');
        console.log(error);
      });
  }, []);

  return { movies, moviesLoadingError };
};

function Movies() {
  const { movies, movieLoadingError } = useFetchMovies(1);
  // const [movies, setMovies] = useState([]);
  // const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  // useFetchMovies(1, movies, setMovies);
  // useFetchMovies(2, movies, setMovies);


  return (
    <div>
      <div>
        <div class="Movie-row">
          <div class="col">Nom</div>
          <div class="col">Date</div>
          <div class="col">Poster</div>
        </div>
        {movies.map((film) => (
          <div class="Movie-row" key={film.title}>
            <div class="col"><Link className="FilmLink" to={`/filmpage/${film.id}`}>{film.title}</Link></div>
            <div class="col">{film.release_date}</div>
            <div class="col">
              <img class="img" src={FILE_PATH + film.poster_path} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className="container">
        {movieLoadingError !== null && (
          <div className="movies-loading-error">{movieLoadingError}</div>
        )}
      </div>
    </div>
  );
}

export default Movies;

{
  /* <table>
{movies.map((film) => (
  <tr className="container" key={film.title}>
    <td className="item">{film.title}</td>
    {/* <td>{film.original_language}</td> */
}
//     <td className="item">{film.release_date}</td>
//     {/* <td>{film.overview}</td> */}
//     <td className="item">
//       <img src={FILE_PATH + film.poster_path} alt="" />
//     </td>
//   </tr>
// ))}
// </table> */}
