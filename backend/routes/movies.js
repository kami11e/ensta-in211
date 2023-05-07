import express from "express";
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import Comment from '../entities/usercomment.js';
import { verifyJWT } from "../helpers/utils.js";

const router = express.Router();





router.get("/searchID/:movieId", function(req, res){
  console.log(req.params.movieId )
  appDataSource
    .getRepository(Movie)
    .find({where:{id: req.params.movieId} })
    .then(function (movie) {
      console.log(movie);
      res.json({ movie: movie });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while searching the movie' });
    });
});

router.get("/GetAll", function(req, res){
  appDataSource
  .getRepository(Movie)
  .find({})
  .then(function (movies) {
    res.json({ movies: movies });
  });  
});

router.post('/news', function (req, res) {
    const movieRepository = appDataSource.getRepository(Movie);
    // const newMovie = userRepository.create({
    //   id: req.body.id,
    //   titre: req.body.titre,
    //   date: req.body.date,
    //   posterurl: req.body.posterurl,
    // });
    const newMovie = movieRepository.create({
      id: req.body.id,
      titre:req.body.title,
      langue:req.body.original_language,
      // mvid:req.body.id,
      date:req.body.release_date,
      posterurl:req.body.poster_path,
      backdroprul:req.body.backdrop_path,
      popularity:req.body.popularity,
      votes:req.body.vote_count,
      vote_avg:req.body.vote_average,
      adult:req.body.adult,
      overview:req.body.overview,
      titre_origin:req.body.original_title
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
          message: `User with id "${newMovie.mvid}" and titre "${newMovie.titre}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the movie' });
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
      message: 'Invalid token'
    });
    return;
  }
  const commentRepository = appDataSource.getRepository(Comment);
  const newComment = commentRepository.create({
    user:verifytoken.uid,
    movie:req.body.mvid,
    content:req.body.content,
  })

  if(newComment.user===null || newComment.movie ===null || newComment.content.length <10) {
    res.status(500).json({message: 'An error occured when adding the comment.'});
    return;
  }

  commentRepository
    // .delete({ id: req.params.movieId })
    .insert(newComment)
    .then(function (newDocument) {
      res.status(204).json({ message: 'Comment successfully submitted.', body:newDocument });
    })
    .catch(function (error) {
      res.status(500).json({ message: 'Error while submitting the comment', error:error });
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
