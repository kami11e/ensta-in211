import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Menu, Modal, Pagination, Space } from 'antd';
import { Link } from 'react-router-dom';
import { MovieCard } from '../MovieCard/MovieCard';
import MovieInfo from '../MovieInfo/MovieInfo';

// import './MoviesTable.css'
const { Search } = Input;
const API_KEY = '522d421671cf75c2cba341597d86403a';

const useFetchMovies = (page, movieListType, setMovieList) => {
  useEffect(() => {
    const api_url =
      `https://api.themoviedb.org/3/movie/` +
      movieListType +
      `?api_key=` +
      API_KEY +
      `&page=` +
      page;
    axios
      .get(api_url)
      .then((response) => {
        var movies = response.data.results;
        console.log(movies);
        movies.forEach((movie) => {
          if (!('release_date' in movie)) {
            movie.release_date = '1970-01-01';
          }
        });
        setMovieList(movies);
      })

      .catch((error) => {
        console.error(error);
      });
  }, [page, movieListType, setMovieList]);
};

const useAddMovieToDB = ({ movie }) => {
  const [movieCreationError, setMovieCreationError] = useState(null);
  const [movieCreationSuccess, setMovieCreationSuccess] = useState(null);
  const displayCreationSuccessMessage = () => {
    setMovieCreationSuccess('New movie created successfully');
    setTimeout(() => {
      setMovieCreationSuccess(null);
    }, 3000);
  };

  const addMoviesToDB = (event) => {
    // This avoid page reload
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/new`, {
        name: movie.title,
        date: movie.release_date,
      })
      .then(() => {
        displayCreationSuccessMessage();
      })
      .catch((error) => {
        setMovieCreationError('An error occured while creating new movie.');
        console.error(error);
      });
  };

  return { addMoviesToDB, movieCreationError, movieCreationSuccess };
};

// function AddMovieToDB(movies) {
//   const { addMoviesToDB, movieCreationError, movieCreationSuccess } =
//     useAddMovieToDB(movies);

//   return (
//     <div>
//       <button
//         className="add-movie-button"
//         onClick={(event) => addMoviesToDB(event)}
//       >
//         Add all movie to database
//       </button>
//       {movieCreationSuccess !== null && (
//         <div className="movie-creation-success">{movieCreationSuccess}</div>
//       )}
//       {movieCreationError !== null && (
//         <div className="movie-creation-error">{movieCreationError}</div>
//       )}
//     </div>
//   );
// }

function SelectMovieListTypeMenu({ movieListType, setMovieListType }) {
  const items = [
    {
      label: 'Now Playing',
      key: 'now_playing',
    },
    {
      label: 'Top Rated',
      key: 'top_rated',
    },
    {
      label: 'Popular',
      key: 'popular',
    },
    {
      label: 'Upcoming',
      key: 'upcoming',
    },
  ];

  return (
    <Menu
      style={{ height: '46px' }}
      onClick={(e) => setMovieListType(e.key)}
      selectedKeys={[movieListType]}
      mode="horizontal"
      items={items}
    />
  );
}

function MoviesTable() {
  const [movieList, setMovieList] = useState([]);
  const [movieListType, setMovieListType] = useState('popular');
  const [page, setPage] = useState(1);
  const [modalMovieId, setModalMovieId] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useFetchMovies(page, movieListType, setMovieList);

  return (
    <div>
      <SelectMovieListTypeMenu
        movieListType={movieListType}
        setMovieListType={setMovieListType}
      />
      <Search
        size="large"
        style={{ height: '46px' }}
        placeholder="Search a movie"
        // onSearch={(value, event) => setQueryMovieName(value)}
      />
      <div className="space-container">
        <Space
          size={[8, 16]}
          align={'center'}
          wrap
          style={{
            justifyContent: 'center',
          }}
        >
          {movieList.map((movie) => (
            <MovieCard
              movie={movie}
              onCardClick={() => {
                setIsModalVisible(true);
                setModalMovieId(movie.id);
              }}
              key={movie.id}
            />
          ))}
        </Space>
      </div>
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <Link to={`/filmpage/${modalMovieId}`}>
            <Button>View Film</Button>
          </Link>
        }
        destroyOnClose={true}
      >
        <MovieInfo movieId={modalMovieId} />
      </Modal>
      <Pagination
        defaultCurrent={1}
        defaultPageSize={20}
        showSizeChanger={false}
        total={20 * 10}
        onChange={(currentPage, pageSize) => setPage(currentPage)}
      />
    </div>
  );
}
export default MoviesTable;
