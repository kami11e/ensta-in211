import { useState } from 'react';
// import axios from 'axios';
import './MovieName.css';

const DEFAULT_VALUES = {
  movieName: '',
};

function MovieName() {
  const [movieName, setMovieNames] = useState(DEFAULT_VALUES);

  return (
    <>
      <label>
        {/* Enter Movie Name */}
        <input
          name="input-movie-name"
          placeholder="Enter ..."
          value={movieName.movieName}
          onChange={(event) =>
            setMovieNames({ ...MovieName, movieName: event.target.value })
          }
        />
      </label>
      <p>{movieName.movieName}</p>
    </>
  );
}
export default MovieName;
