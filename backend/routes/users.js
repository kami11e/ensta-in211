import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import {hashPassword, verifyJWT, generateJWT} from '../helpers/utils.js';
// const Utils = require('../helpers/utils.js');
import moment from 'moment'
import MyList from '../entities/usermylist.js';
import Movie from '../entities/movie.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.get('/userInfo', function (req, res) {
  const token = req.headers.token;
  let content, userInfo, userMyList;

  console.log(token);
  try {
    content = verifyJWT(token);
  } catch (error) {
    console.log(error);
    res.status(503).json({message:"JWT token invalid"});
    return;
  };
  appDataSource
    .getRepository(User)
    .find({id: content.uid})
    .then(function (result) {
      userInfo = result;
      
    })
    .catch(function(error){

    })
  appDataSource
    .getRepository(MyList)
    .find({user: content.uid})
    .then(function(result){
      userMyList = result;
      console.log(userInfo);
      console.log(userMyList);
      res.status(200).json({
        message:"Success",
        userInfo: userInfo,
        mylist: userMyList
      })
    })
    .catch(function(error){

    })
  appDataSource
    .getRepository(Movie)
    .find({})
});


router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    name: req.body.name,
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});



router.post('/login', function (req, res) {

  // const email = req.body.usermail;
  // const password = req.body.password;

  appDataSource
    .getRepository(User)
    .find({where:{email:req.body.usermail}})
    .then(function (result) {
      // res.status(201).json(newDocument);
      console.log(result[0])
      if(result[0].password === req.body.password){
        // console.log("password verified");
        const data = {
          message: "Authentication sucess.",
          uid: result[0].id,
          firstname: result[0].firstname,
          lastname:result[0].lastname,
          name:result[0].name,
        };
        const token = generateJWT(data);
        const refreshExpiry = moment().utc().add(3, 'days').endOf('day').format('X');
        const refreshtoken = generateJWT({ exp: parseInt(refreshExpiry), data: data.uid });
        res.status(202).json({
            // user: data, 
            token, 
            refresh: refreshtoken 
            // message: 'login successful',
        });

        // res.status(202).json(generateJWT(data));

        // appDataSource
        //   .createQueryBuilder()
        //   .update(User)
        //   .set({
        //       loginStatus: true
        //   })
        //   .where("email = :email", { email: req.body.usermail })
        //   .execute()
      }else{
        // console.log("not verified");
        res.status(501).json({
          message: "Incorrect Password."
        });
      }
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

router.delete('/:userId', function (req, res) {
  const mylistRepository = appDataSource.getRepository(MyList);
  mylistRepository
    .delete({user: req.params.userId})
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function (ex) {
      console.error(ex);
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

export default router;
