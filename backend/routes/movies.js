import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import Comment from '../entities/usercomment.js';
import { verifyJWT } from '../helpers/utils.js';

const router = express.Router();

router.get('/searchID/:movieId', function (req, res) {
  console.log(req.params.movieId);
  appDataSource
    .getRepository(Movie)
    .find({ where: { id: req.params.movieId } })
    .then(function (movie) {
      console.log(movie);
      res.json({ movie: movie });
    })
    .catch(function () {
      res
        .status(500)
        .json({ status_message: 'Error while searching the movie' });
    });
});

router.get('/GetAll', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    });
});

router.post('/news', function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  console.log('--------------------');
  console.log(req.body);
  const newMovie = movieRepository.create({
    id: req.body.id,
    title: req.body.title,
    original_language: req.body.original_language,
    release_date: req.body.release_date,
    poster_path: req.body.poster_path,
    backdrop_path: req.body.backdrop_path,
    popularity: req.body.popularity,
    vote_count: req.body.vote_count,
    vote_average: req.body.vote_average,
    adult: req.body.adult,
    overview: req.body.overview,
    original_title: req.body.original_title,
  });

  movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          status_message: `User with id "${newMovie.id}" and titre "${newMovie.title}" already exists`,
        });
      } else {
        res
          .status(500)
          .json({ status_message: 'Error while creating the movie' });
      }
    });
});

router.post('/comment', function (req, res) {
  const token = req.headers.token;
  let verifytoken;
  try {
    verifytoken = verifyJWT(token);
  } catch (error) {
    res.status(401).json({
      status_message: 'Invalid token',
    });

    return;
  }
  const commentRepository = appDataSource.getRepository(Comment);
  const newComment = commentRepository.create({
    user: verifytoken.uid,
    movie: req.body.mvid,
    content: req.body.content,
    rank: req.body.rank
  });

  if (
    newComment.user === null ||
    newComment.movie === null ||
    newComment.content.length < 10
  ) {
    res
      .status(500)
      .json({ status_message: 'An error occured when adding the comment.' });

    return;
  }

  commentRepository
    // .delete({ id: req.params.movieId })
    .insert(newComment)
    .then(function (newDocument) {
      res.status(204).json({
        status_message: 'Comment successfully submitted.',
        body: newDocument,
      });
    })
    .catch(function (error) {
      res
        .status(500)
        .json({
          status_message: 'Error while submitting the comment',
          error: error,
        });
    });
});

router.get('/comment/:movieId', function (req, res) {
  const commentRepository = appDataSource.getRepository(Comment);
  commentRepository
    // .delete({ id: req.params.movieId })
    .find({ where: { movie: { id: req.params.movieId } }, relations: ['user'] })
    .then(function (newDocument) {
      // console.log(newDocument);
      const resDocument = newDocument.map(obj=>{
        const {comment_id, content, rank, user} = obj;
        return {
          content:content,
          rank:rank,
          username: user.name,
        };
      });
      console.log(resDocument);
      res.status(200).json({
        status_message: 'Comments successfully retrieved.',
        body: resDocument,
      });
    })
    .catch(function (error) {
      res
        .status(500)
        .json({
          status_message: 'Error while retrieving the comments',
          error: error,
        });
    });
});
router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ status_message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res
        .status(500)
        .json({ status_message: 'Error while deleting the movie' });
    });
});

export default router;
