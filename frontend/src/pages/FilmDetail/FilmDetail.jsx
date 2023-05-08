import './FilmDetail.css';
// import * as React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddComment from '../../components/AddComment/AddComment';
import AddFilm2List from '../../components/AddFilm2List/AddFilm2List';
const FILE_PATH = 'https://image.tmdb.org/t/p/w200';

const useSearchFilm = (mvid) => {
  const [film, setFilm] = useState([]);
  const [filmSearchError, setFilmSearchError] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/movies/searchID/${mvid}`)
      .then((response) => {
        console.log('no error');
        console.log(response.data.movie);
        setFilm(response.data.movie);
      })
      .catch((error) => {
        console.log('error');
        setFilmSearchError('An error occured while searching the movie.');
        console.error(error);
      });
  }, [mvid]);

  return { film, filmSearchError };
};

function FilmDetail() {
  const { mvid } = useParams();
  // const uid = localStorage.getItem("uid");
  const { film, filmSearchError } = useSearchFilm(mvid);

  const movie = film[0];
  if (movie) {
    return (
      <div>
        <h1
          style={{ textAlign: 'center', fontFamily: 'Ink Free', fontSize: 40 }}
        >
          {' '}
          {movie.titre}
        </h1>
        <hr
          style={{
            borderTop: '1px solid #fff ',
            marginLeft: 30,
            marginRight: 30,
            alignItems: 'center',
            marginTop: -10,
          }}
        ></hr>
        <div className="Movie-content">
          <div class="col-left">
            <img className="img" src={FILE_PATH + movie.posterurl} alt="" />
          </div>

          <div class="col-right">
            <div class="col-right-row">
              <h1
                class="col-right-row-title"
                style={{ fontFamily: 'Comic Sans MS', fontSize: 26 }}
              >
                {' '}
                Overview
              </h1>
            </div>
            <div class="col-right-row">
              <h3
                class="col-right-row-content"
                style={{
                  marginTop: -10,
                  fontFamily: 'Comic Sans MS',
                  fontSize: 16,
                }}
              >
                {' '}
                {movie.overview}
              </h3>
            </div>

            <div class="col-right-row-content">
              <AddFilm2List mvid={mvid} class="add-film-to-list" />
            </div>
          </div>
        </div>
        <hr
          style={{
            borderTop: '1px solid #fff ',
            marginLeft: 30,
            marginRight: 30,
            alignItems: 'center',
            marginTop: 10,
          }}
        ></hr>
        <div className="Comments">
          <AddComment class="add-comment" />
        </div>
      </div>
    );
  }
}

export default FilmDetail;
