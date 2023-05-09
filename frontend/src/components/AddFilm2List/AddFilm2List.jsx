import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';

const useCheckMovieInList = (movieId, setMovieInList) => {
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/mylist/`, {
        headers: {
          token: sessionStorage.getItem('JWTtoken'),
        },
      })
      .then((response) => {
        const movieList = response.data.result;
        console.log(movieId, response.data.result);

        if (movieList === null) {
          setMovieInList(null);

          return;
        } else if (movieList.length === 0) {
          setMovieInList(false);

          return;
        } else {
          setMovieInList(movieList.some((item) => item.id === movieId));

          return;
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.status_message !== 'token not valid') {
          Modal.error({
            title: error.status_message,
            content: error.response.data.status_message,
          });
        }
        setMovieInList(null);
      });
  }, [movieId, setMovieInList]);
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
      Modal.error({
        title: error.status_message,
        content: error.response.data.status_message,
      });
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
      Modal.error({
        title: error.status_message,
        content: error.response.data.status_message,
      });
    });
};

function AddFilm2List({ movieId }) {
  const [movieInList, setMovieInList] = useState(null);

  useCheckMovieInList(movieId, setMovieInList);
  console.log('movieInList:', movieInList);

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
