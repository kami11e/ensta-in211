import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Typography } from 'antd';
import { MovieRateShow } from '../Movie/Movie.jsx';
import './MovieInfo.css';

const { Title, Text } = Typography;

const API_KEY = '522d421671cf75c2cba341597d86403a';

const useFetchMovieInfo = (movieId, setMovie) => {
  useEffect(() => {
    const api_url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    axios
      .get(api_url)
      .then((response) => {
        setMovie(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, [movieId, setMovie]);
};

function MovieInfo({ movieId }) {
  // const [movie, setMovie] = useState({
  //   title: '',
  //   poster_path: '',
  //   genres: [0,''],
  //   overview: '',
  // });
  const [movie, setMovie] = useState(null);
  useFetchMovieInfo(movieId, setMovie);

  if (!movie) {
    return <div>loading</div>;
  }

  console.log(movie);

  return (
    <Row className="movie-container" align="top">
      <Col span={6}>
        <img
          className="movie-poster"
          alt={movie.title}
          src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
        />
      </Col>
      <Col span={18} style={{ padding: '5%' }}>
        <Title level={2}>
          {movie.title}({movie.release_date})
        </Title>
        <MovieRateShow movie={movie} />
        <Title level={4}>
          {movie.genres.map((genre, index) => {
            const isLastGenre = index === movie.genres.length - 1;

            return isLastGenre ? genre.name : `${genre.name}, `;
          })}
        </Title>
        <Text>{movie.overview}</Text>
      </Col>
    </Row>
  );
}

export default MovieInfo;
