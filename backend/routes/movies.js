import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import Comment from '../entities/usercomment.js';
import { verifyJWT } from '../helpers/utils.js';

const router = express.Router();

/**
 * @swagger
 * /movies/searchID/{movieId}:
 *   get:
 *     summary: Retrieve a movie by its ID
 *     description: Retrieve a single movie by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: Numeric ID of the movie to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *       500:
 *         description: Error while searching the movie
 */
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

/**
 * @swagger
 * /movies/GetAll:
 *   get:
 *     summary: Retrieve all movies
 *     description: Retrieve a list of all movies from the database.
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 */
router.get('/GetAll', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    });
});

/**
 * @swagger
 * /movies/news:
 *   post:
 *     summary: Creates a new movie
 *     description: Endpoint for creating a new movie in the appDataSource repository
 *     requestBody:
 *       required: true
 *       description: The movie object to be created
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               title:
 *                 type: string
 *               original_language:
 *                 type: string
 *               release_date:
 *                 type: string
 *                 format: date
 *               poster_path:
 *                 type: string
 *               backdrop_path:
 *                 type: string
 *               popularity:
 *                 type: number
 *               vote_count:
 *                 type: number
 *               vote_average:
 *                 type: number
 *               adult:
 *                 type: boolean
 *               overview:
 *                 type: string
 *               original_title:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created a new movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 original_language:
 *                   type: string
 *                 release_date:
 *                   type: string
 *                   format: date
 *                 poster_path:
 *                   type: string
 *                 backdrop_path:
 *                   type: string
 *                 popularity:
 *                   type: number
 *                 vote_count:
 *                   type: number
 *                 vote_average:
 *                   type: number
 *                 adult:
 *                   type: boolean
 *                 overview:
 *                   type: string
 *                 original_title:
 *                   type: string
 *       '400':
 *         description: Bad request, movie with same id and title already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_message:
 *                   type: string
 *       '500':
 *         description: Internal server error while creating the movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_message:
 *                   type: string
 */
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

/**
 * @swagger
 * /movies/comment:
 *   post:
 *     summary: Creates a new comment for a movie.
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         description: The authentication token.
 *         type: string
 *         required: true
 *       - in: body
 *         name: comment
 *         description: The comment to create.
 *         schema:
 *           type: object
 *           properties:
 *             mvid:
 *               type: integer
 *               description: The ID of the movie.
 *             content:
 *               type: string
 *               description: The content of the comment.
 *             rank:
 *               type: integer
 *               description: The rank of the comment.
 *         required:
 *           - mvid
 *           - content
 *           - rank
 *     responses:
 *       204:
 *         description: Comment successfully submitted.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The success message.
 *             body:
 *               type: object
 *               description: The newly created comment.
 *               properties:
 *                 user:
 *                   type: integer
 *                   description: The ID of the user who made the comment.
 *                 movie:
 *                   type: integer
 *                   description: The ID of the movie the comment is about.
 *                 content:
 *                   type: string
 *                   description: The content of the comment.
 *                 rank:
 *                   type: integer
 *                   description: The rank of the comment.
 *       400:
 *         description: Invalid token or missing comment parameters.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *       401:
 *         description: Invalid token.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *       500:
 *         description: An error occurred when adding the comment or submitting the comment.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *             error:
 *               type: string
 *               description: The error message.
 */
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
    rank: req.body.rank,
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
      res.status(500).json({
        status_message: 'Error while submitting the comment',
        error: error,
      });
    });
});

/**
 * @swagger
 * /movies/comment:
 *   post:
 *     summary: Creates a new comment for a movie.
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         description: The authentication token.
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: comment
 *         description: The comment to create.
 *         schema:
 *           type: object
 *           properties:
 *             mvid:
 *               type: integer
 *               description: The ID of the movie the comment is for.
 *             content:
 *               type: string
 *               description: The content of the comment.
 *             rank:
 *               type: integer
 *               description: The rank of the comment.
 *         required:
 *           - mvid
 *           - content
 *           - rank
 *     responses:
 *       204:
 *         description: The comment was successfully created.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The success message.
 *             body:
 *               type: object
 *               description: The newly created comment.
 *               properties:
 *                 user:
 *                   type: integer
 *                   description: The user ID of the comment author.
 *                 movie:
 *                   type: integer
 *                   description: The movie ID the comment is for.
 *                 content:
 *                   type: string
 *                   description: The content of the comment.
 *                 rank:
 *                   type: integer
 *                   description: The rank of the comment.
 *       400:
 *         description: Invalid token.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *       500:
 *         description: An error occurred when adding the comment.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *             error:
 *               type: object
 *               description: The error object.
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *                 stack:
 *                   type: string
 *                   description: The stack trace of the error.
 */
router.get('/comment/:movieId', function (req, res) {
  const commentRepository = appDataSource.getRepository(Comment);
  commentRepository
    // .delete({ id: req.params.movieId })
    .find({ where: { movie: { id: req.params.movieId } }, relations: ['user'] })
    .then(function (newDocument) {
      // console.log(newDocument);
      const resDocument = newDocument.map((obj) => {
        const { comment_id, content, rank, user } = obj;
        return {
          content: content,
          rank: rank,
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
      res.status(500).json({
        status_message: 'Error while retrieving the comments',
        error: error,
      });
    });
});

/**
 * @swagger
 * /movies/{movieId}:
 *   delete:
 *     summary: Deletes a movie by ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: movieId
 *         description: The ID of the movie to delete.
 *         type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: The movie has been successfully deleted.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The success message.
 *       500:
 *         description: An error occurred when deleting the movie.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 */
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
