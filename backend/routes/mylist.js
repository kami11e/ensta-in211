import express from 'express';
import { appDataSource } from '../datasource.js';
import MyList from '../entities/usermylist.js';
import { verifyJWT } from '../helpers/utils.js';

const router = express.Router();

router.get('/', function (req, res) {
  // check token
  const verifiedtoken = verifyJWT(req.headers.token);
  if (verifiedtoken === null) {
    res.status(400).json({
      message: 'token not valid',
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
      res.status(500).json({ message: 'no list in user ${verifiedtoken.uid}' });
    });
});

router.delete('/:movieId', function (req, res) {
  const verifiedtoken = verifyJWT(req.headers.token);
  if (verifiedtoken === null) {
    res.status(400).json({
      message: 'token not valid',
    });

    return;
  }
  appDataSource
    .getRepository(MyList)
    .delete({
      where: {
        user: { id: verifiedtoken.uid },
        movie: { id: req.params.movieId },
      },
    })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the movie' });
    });
});

router.post('/:movieId', function (req, res) {
  const myListRepository = appDataSource.getRepository(MyList);
  const token = req.headers.token;
  let verifiedtoken;

  // check token
  try {
    verifiedtoken = verifyJWT(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'JWT token invalid' });

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
          message: `Movie with id "${newLsElem.mvid}" already added o your list`,
        });
      } else {
        res.status(500).json({ message: 'Error while adding movie to list' });
      }
    });
});

export default router;
