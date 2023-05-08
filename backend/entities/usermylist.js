import typeorm from 'typeorm';
// import User from './user.js';
// import { Movie } from './movie.js';

const MyList = new typeorm.EntitySchema({
  name: 'MyList',
  columns: {
    id: {
      primary: true,
      type: String,
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
    },
    movie: {
      target: 'Movie',
      type: 'many-to-one',
    },
  },
});

typeorm.TableForeignKey;

export default MyList;
