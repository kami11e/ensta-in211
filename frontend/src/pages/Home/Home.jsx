import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Menu, Modal, Pagination, Space } from 'antd';
import { Link } from 'react-router-dom';
import MoviesTable from '../../components/MoviesTable/MoviesTable';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import MovieInfo from '../../components/MovieInfo/MovieInfo';

const { Search } = Input;
const API_KEY = '522d421671cf75c2cba341597d86403a';

const useFetchMovies = (page, movieListType, setMovieList, isSearch) => {
  useEffect(() => {
    if (!isSearch) {
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
    }
  }, [page, movieListType, setMovieList, isSearch]);
};

const useSearchMovies = (page, query, setMovieList, isSearch) => {
  useEffect(() => {
    if (isSearch) {
      const api_url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${page}&query=${query}`;
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
    }
  }, [page, query, setMovieList, isSearch]);
};

function SelectMovieListTypeMenu({
  movieListType,
  setMovieListType,
  setIsSearch,
}) {
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
      onClick={(e) => {
        setMovieListType(e.key);
        setIsSearch(false);
      }}
      selectedKeys={[movieListType]}
      mode="horizontal"
      items={items}
    />
  );
}

function Home() {
  const [movieList, setMovieList] = useState([]);
  const [movieListType, setMovieListType] = useState('popular');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  useFetchMovies(page, movieListType, setMovieList, isSearch);
  useSearchMovies(page, query, setMovieList, isSearch);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Movie list</h1>
      <SelectMovieListTypeMenu
        movieListType={movieListType}
        setMovieListType={setMovieListType}
        setIsSearch={setIsSearch}
      />
      <Search
        size="large"
        style={{ height: '46px' }}
        placeholder="Search a movie"
        onSearch={(value) => {
          setQuery(value);
          setIsSearch(true);
        }}
      />
      <MoviesTable movieList={movieList} page={page} setPage={setPage} />
    </div>
  );
}

export default Home;
