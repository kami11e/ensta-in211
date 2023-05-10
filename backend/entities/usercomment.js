import typeorm from 'typeorm';

const Comment = new typeorm.EntitySchema({
  name: 'Comment',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: 'increment',
    },
    content: {
      type: String,
      default: null,
    },
    rank:{
      type: 'integer',
    }

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

export default Comment;
