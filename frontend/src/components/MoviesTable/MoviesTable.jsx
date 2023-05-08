import { useState } from 'react';
import { Button, Modal, Pagination, Space } from 'antd';
import { Link } from 'react-router-dom';
import { MovieCard } from '../MovieCard/MovieCard';
import MovieInfo from '../MovieInfo/MovieInfo';

function MoviesTable({ movieList, page, setPage }) {
  const [modalMovieId, setModalMovieId] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (movieList.length === 0) {
    return <div>loading</div>;
  }

  return (
    <div>
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
        defaultCurrent={page}
        defaultPageSize={20}
        showSizeChanger={false}
        total={20 * 10}
        onChange={(currentPage, pageSize) => setPage(currentPage)}
      />
    </div>
  );
}
export default MoviesTable;
