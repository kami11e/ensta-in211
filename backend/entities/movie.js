import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String
    },
    titre: {
      type: String,
    },
    date: { type: String },
    posterurl: { type: String },
  },
});

export default Movie;