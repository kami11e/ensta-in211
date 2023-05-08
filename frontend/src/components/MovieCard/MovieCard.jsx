import { Card, Modal, Rate, Space } from 'antd';
import { useState } from 'react';
import './MovieCard.css';
const { Meta } = Card;

function MovieRateShow({ movie }) {
  return (
    <Space size={2} wrap={false} align="baseline">
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
          fontSize: 12,
          color: 'gray',
        }}
      >
        ({movie.vote_average}/{movie.vote_count})
      </div>
    </Space>
  );
}

function MovieCard({ movie, onCardClick }) {
  return (
    <Card
      hoverable
      style={{ width: 200, height: 450 }}
      cover={
        <img
          alt={movie.title}
          src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
        />
      }
      onClick={onCardClick}
    >
      <Meta title={movie.title} description={movie.release_date} />
      <MovieRateShow movie={movie} />
    </Card>
  );
}
export { MovieRateShow, MovieCard };
