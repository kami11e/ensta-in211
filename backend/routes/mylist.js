import express from 'express';
import { appDataSource } from '../datasource.js';
import MyList from '../entities/usermylist.js';
import { verifyJWT } from '../helpers/utils.js';

const router = express.Router();

/**
 * @swagger
 * /mylist/:
 *   get:
 *     summary: Retrieves the list of movies of the authenticated user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         description: The JWT access token used for authentication.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The list of movies of the authenticated user.
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: array
 *               description: The list of movies.
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the movie.
 *                   title:
 *                     type: string
 *                     description: The title of the movie.
 *                   original_language:
 *                     type: string
 *                     description: The original language of the movie.
 *                   release_date:
 *                     type: string
 *                     description: The release date of the movie.
 *                   poster_path:
 *                     type: string
 *                     description: The path to the poster image of the movie.
 *                   backdrop_path:
 *                     type: string
 *                     description: The path to the backdrop image of the movie.
 *                   popularity:
 *                     type: number
 *                     description: The popularity score of the movie.
 *                   vote_count:
 *                     type: integer
 *                     description: The number of votes the movie has received.
 *                   vote_average:
 *                     type: number
 *                     description: The average rating of the movie.
 *                   adult:
 *                     type: boolean
 *                     description: Whether the movie is for adults only.
 *                   overview:
 *                     type: string
 *                     description: The plot summary of the movie.
 *                   original_title:
 *                     type: string
 *                     description: The original title of the movie.
 *       400:
 *         description: Invalid access token.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *       500:
 *         description: An error occurred when retrieving the list of movies of the authenticated user.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 */
router.get('/', function (req, res) {
  // check token
  const verifiedtoken = verifyJWT(req.headers.token);
  if (verifiedtoken === null) {
    res.status(400).json({
      status_message: 'token not valid',
    });

    return;
  }

  appDataSource
    .getRepository(MyList)
    .find({ where: { user: { id: verifiedtoken.uid } }, relations: ['movie'] })
    .then((result) => {
      res.json({ result: result.map((item) => item.movie) });
    })
    .catch(function () {
      res
        .status(500)
        .json({ status_message: 'no list in user ${verifiedtoken.uid}' });
    });
});

/**
 * @swagger
 * /mylist/{movieId}:
 *   delete:
 *     summary: Removes the specified movie from the authenticated user's list.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         description: The JWT access token used for authentication.
 *         required: true
 *         type: string
 *       - in: path
 *         name: movieId
 *         description: The ID of the movie to remove from the user's list.
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: The movie has been successfully removed from the authenticated user's list.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The success message.
 *       400:
 *         description: Invalid access token.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *       500:
 *         description: An error occurred when removing the movie from the authenticated user's list.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 */
router.delete('/:movieId', function (req, res) {
  const verifiedtoken = verifyJWT(req.headers.token);
  if (verifiedtoken === null) {
    res.status(400).json({
      status_message: 'token not valid',
    });

    return;
  }

  appDataSource
    .getRepository(MyList)
    .findOne({
      where: {
        user: { id: verifiedtoken.uid },
        movie: { id: req.params.movieId },
      },
    })
    .then((item) => {
      if (item) {
        return appDataSource.getRepository(MyList).remove(item);
      } else {
        throw new Error('Item not found');
      }
    })
    .then(function () {
      res.status(204).json({ status_message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res
        .status(500)
        .json({ status_message: 'Error while deleting the movie' });
    });
});

/**
 * @swagger
 * /mylist/{movieId}:
 *   post:
 *     summary: Adds the specified movie to the authenticated user's list.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: token
 *         description: The JWT access token used for authentication.
 *         required: true
 *         type: string
 *       - in: path
 *         name: movieId
 *         description: The ID of the movie to add to the user's list.
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: The movie has been successfully added to the authenticated user's list.
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the new element in the user's list.
 *             user:
 *               type: integer
 *               description: The ID of the authenticated user who added the movie to their list.
 *             movie:
 *               type: integer
 *               description: The ID of the movie that was added to the user's list.
 *       400:
 *         description: Invalid access token or movie already added to user's list.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 *       500:
 *         description: An error occurred when adding the movie to the authenticated user's list.
 *         schema:
 *           type: object
 *           properties:
 *             status_message:
 *               type: string
 *               description: The error message.
 */
router.post('/:movieId', function (req, res) {
  const myListRepository = appDataSource.getRepository(MyList);
  const token = req.headers.token;
  let verifiedtoken;

  // check token
  try {
    verifiedtoken = verifyJWT(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status_message: 'JWT token invalid' });

    return;
  }

  const newLsElem = myListRepository.create({
    id: verifiedtoken.uid.toString(16) + '-' + req.params.movieId.toString(16),
    user: verifiedtoken.uid,
    movie: req.params.movieId,
  });
  console.log(newLsElem);
  myListRepository
    .insert(newLsElem)
    .then((newDocument) => {
      res.status(201).json(newDocument);
    })
    .catch((error) => {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          status_message: `Movie with id "${newLsElem.mvid}" already added o your list`,
        });
      } else {
        res
          .status(500)
          .json({ status_message: 'Error while adding movie to list' });
      }
    });
});

export default router;
