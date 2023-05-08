import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      unique: true,
    },
    title: {
      type: String,
      unique: false,
    },
    original_language: {
      type: String,
      default: null,
      unique: false,
    },
    release_date: {
      type: String,
      default: null,
    },
    poster_path: {
      type: String,
      default: null,
    },
    backdrop_path: {
      type: String,
      default: null,
    },
    popularity: {
      type: 'double precision',
    },
    vote_count: {
      type: 'integer',
      default: null,
    },
    vote_average: {
      type: 'double precision',
      default: null,
    },
    adult: {
      type: Boolean,
      default: null,
    },
    overview: {
      type: String,
      default: null,
    },
    original_title: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      default: '',
    },
  },
});

export default Movie;
