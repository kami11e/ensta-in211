import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
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
        res.status(202).json({
          message: "Authentication sucess.",
          uid: result[0].id,
          firstname: result[0].firstname,
          lastname:result[0].lastname,
          name:result[0].name,
        });
        appDataSource
          .createQueryBuilder()
          .update(User)
          .set({
              loginStatus: true
          })
          .where("email = :email", { email: req.body.usermail })
          .execute()
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
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

export default router;
