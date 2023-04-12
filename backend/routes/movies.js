import express from "express";
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';

const router = express.Router();

function routeCallback(req, res){
    // console.log("0000");
    // res.json({ movies: [] });
    appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    });

}

router.get("/", routeCallback);


router.post('/news', function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);
    // const newMovie = userRepository.create({
    //   id: req.body.id,
    //   titre: req.body.titre,
    //   date: req.body.date,
    //   posterurl: req.body.posterurl,
    // });
    const newMovie = movieRepository.create({
      // id: req.body.id,
      titre: req.body.titre,
      date: req.body.date,
      posterurl: req.body.posterurl,
    });
  
    movieRepository
      .insert(newMovie)
      .then(function(newDocument) {
        res.status(201).json(newDocument);
      })
      .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with id "${newMovie.id}" and titre "${newMovie.titre}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the movie' });
      }
    });
});

router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the movie' });
    });
});


export default router;
