import './FilmDetail.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'antd';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import AddComment from '../../components/AddComment/AddComment';

const API_KEY = '522d421671cf75c2cba341597d86403a';

const useFetchMovies = (movieId, setKey) => {
  useEffect(() => {
    const api_url =
      `https://api.themoviedb.org/3/movie/` +
      movieId +
      `/videos` +
      `?api_key=` +
      API_KEY;

    axios
      .get(api_url)
      .then((response) => {
        setKey(response.data.results[0].key);
      })

      .catch((error) => {
        console.error(error);
        Modal.error({
          title: error.status_message,
          content: error.response.data.status_message,
        });
      });
  }, [movieId, setKey]);
};

function FilmDetail() {
  const [key, setKey] = useState('');
  const movieId = useParams().mvid;
  useFetchMovies(movieId, setKey);
  const videoUrl = 'https://www.youtube.com/embed/' + key;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Row align="top">
      <Col span={6}>
        <MovieInfo movieId={movieId} />
        <AddComment />
      </Col>

      <Col span={10}>
        <iframe
          width="1280"
          height="720"
          src={videoUrl}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Col>
    </Row>
  );
}

export default FilmDetail;
