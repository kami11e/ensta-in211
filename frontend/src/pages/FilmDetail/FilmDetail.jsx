import './FilmDetail.css';
// import * as React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddComment from '../../components/AddComment/AddComment';
import AddFilm2List from '../../components/AddFilm2List/AddFilm2List';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import { Layout, theme, Col, Row, Typography } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const {Title, Text} = Typography;
const FILE_PATH = 'https://image.tmdb.org/t/p/w200';
const API_KEY = '522d421671cf75c2cba341597d86403a';




const useFetchMovies = (movieId, setKey) => {
  useEffect(() => {
   
      const api_url =
        `https://api.themoviedb.org/3/movie/` +
        movieId +
        `/videos` +
        `?api_key=` +
        API_KEY
        
      axios
        .get(api_url)
        .then((response) => {
          setKey(response.data.results[0].key);
        })

        .catch((error) => {
          console.error(error);
        });
    
  }, [movieId, setKey]);
};



function FilmDetail (){
  const [key, setKey]=useState("");
  const movieId=useParams().mvid;
  useFetchMovies(movieId, setKey);
  const videoUrl="https://www.youtube.com/embed/"+ key;
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Row align="top">
      <Col span={6}>
        <MovieInfo movieId={movieId}/>
      </Col>

      <Col span={10}>
          <iframe width="1280" height="720" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
      </Col>
    </Row>

    )
  
}

export default FilmDetail;
