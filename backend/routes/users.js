import express from 'express';
import moment from 'moment';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import { generateJWT, verifyJWT } from '../helpers/utils.js';
import MyList from '../entities/usermylist.js';

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
  const content = verifyJWT(req.headers.token);
  if (content === null) {
    res.status(400).json({
      status_message: 'token not valid',
    });

    return;
  }
  appDataSource
    .getRepository(User)
    .find({ where: { id: content.uid } })
    .then((result) => {
      res.status(200).json({
        status_message: 'Success',
        result: result[0],
      });
    })
    .catch((error) => console.error(error));
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
          status_message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res
          .status(500)
          .json({ status_message: 'Error while creating the user' });
      }
    });
});

router.post('/login', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({ where: { email: req.body.usermail } })
    .then(function (result) {
      // res.status(201).json(newDocument);
      console.log(result[0]);
      if (result[0].password === req.body.password) {
        // console.log("password verified");
        const data = {
          status_message: 'Authentication sucess.',
          uid: result[0].id,
          firstname: result[0].firstname,
          lastname: result[0].lastname,
          name: result[0].name,
        };
        const token = generateJWT(data);
        const refreshExpiry = moment()
          .utc()
          .add(3, 'days')
          .endOf('day')
          .format('X');
        const refreshtoken = generateJWT({
          exp: parseInt(refreshExpiry),
          data: data.uid,
        });
        res.status(202).json({
          // user: data,
          token,
          refresh: refreshtoken,
          // status_message: 'login successful',
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
      } else {
        // console.log("not verified");
        res.status(501).json({
          status_message: 'Incorrect Password.',
        });
      }
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          status_message: `User with email  already exists`,
        });
      } else {
        res.status(500).json({ status_message: 'Error while loging in' });
      }
    });
});

router.delete('/:userId', function (req, res) {
  const mylistRepository = appDataSource.getRepository(MyList);
  mylistRepository.delete({ user: req.params.userId });
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ status_message: 'User successfully deleted' });
    })
    .catch(function (ex) {
      console.error(ex);
      res.status(500).json({ status_message: 'Error while deleting the user' });
    });
});

export default router;
