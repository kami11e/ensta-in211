import { useParams } from 'react-router-dom';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
// import './MovieInfoPage.css';
function MovieInfoPage() {
  const { movieId } = useParams();

  return <MovieInfo movieId={movieId} />;
}

export default MovieInfoPage;
