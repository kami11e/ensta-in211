import { Card, Rate, Space } from 'antd';

const { Meta } = Card;
function Movie(movie) {
  return (
    <div key={movie.id}>
      <Card
        hoverable
        style={{ width: 200 }}
        cover={
          <img
            alt={movie.title}
            src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
          />
        }
      >
        <Meta title={movie.title} description={movie.release_date} />
        <Space size={2} wrap={false}>
          <Rate
            style={{
              fontSize: 12,
            }}
            disabled
            allowHalf
            value={movie.vote_average / 2}
            count={5}
          />
          <div
            style={{
              fontSize: 8,
              color: 'gray',
            }}
          >
            ({movie.vote_average}/{movie.vote_count})
          </div>
        </Space>
      </Card>
    </div>
  );
}
export default Movie;
