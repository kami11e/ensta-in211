import { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

const checkMovieInList = (movieId) => {
  let movieList = null;

  axios
    .get(`${import.meta.env.VITE_BACKDEND_URL}/mylist/`, {
      headers: {
        token: sessionStorage.getItem('JWTtoken'),
      },
    })
    .then((response) => {
      movieList = response.data.result;
      console.log(movieId, response.data.result);
      if (movieList === null) {
        return null;
      } else if (movieList.length === 0) {
        return false;
      } else {
        return movieList.some((item) => item.id === movieId);
      }
    })
    .catch((error) => {
      console.error(error);

      return null;
    });
};

const addMovieToList = (movieId) => {
  axios
    .post(
      `${import.meta.env.VITE_BACKDEND_URL}/mylist/${movieId}`,
      {},
      {
        headers: {
          token: sessionStorage.getItem('JWTtoken'),
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteMovieFromList = (movieId) => {
  axios
    .delete(`${import.meta.env.VITE_BACKDEND_URL}/mylist/${movieId}`, {
      headers: {
        token: sessionStorage.getItem('JWTtoken'),
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

function AddFilm2List({ movieId }) {
  const [movieInList, setMovieInList] = useState(null);

  useEffect(() => {
    setMovieInList(checkMovieInList(movieId));
  }, [movieId, movieInList]);

  return (
    movieInList !== null && (
      <Button
        onClick={() => {
          if (movieInList) {
            deleteMovieFromList(movieId);
            setMovieInList(false);
          } else {
            addMovieToList(movieId);
            setMovieInList(true);
          }
        }}
      >
        {movieInList ? 'Remove from my list' : 'Add to my list'}
      </Button>
    )
  );
}

export default AddFilm2List;
